const { GoogleGenAI } = require('@google/genai');
const { buildPrompt } = require('./promptBuilder');

// New unified SDK (replaces the deprecated @google/generative-ai package).
// Reads GEMINI_API_KEY from env automatically if no apiKey is passed explicitly,
// but we pass it explicitly here to be unambiguous about where the key comes from.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Week 8 fix, take 2 ---
// First attempt pinned to 'gemini-2.5-flash' to dodge the 'gemini-flash-latest'
// alias silently repointing to Gemini 3.5. That then hit a NEW wall:
// gemini-2.5-flash returns 404 NOT_FOUND -- "This model is no longer available
// to new users" -- for API keys created after Google's 3.x rollout. So the whole
// 2.5 series (and its thinkingBudget-based config) is off the table for this key.
//
// Moving to gemini-3.5-flash, the current GA model. IMPORTANT: Gemini 3.x uses a
// completely different thinking-config shape:
//   - Gemini 2.5.x: thinkingConfig: { thinkingBudget: <token count>, 0 = off }
//   - Gemini 3.x:   thinkingConfig: { thinkingLevel: 'minimal'|'low'|'medium'|'high' }
// Sending thinkingBudget to a 3.x model is what caused the earlier 400
// INVALID_ARGUMENT. Gemini 3.x models also CANNOT fully disable thinking --
// 'minimal' is the closest equivalent to the old thinkingBudget:0 behaviour.
const MODEL_NAME = 'gemini-3.5-flash';

/**
 * @typedef {Object} GenerateInput
 * @property {string} productName
 * @property {string} ingredients
 * @property {string} [weight]
 * @property {string} category
 * @property {string} features
 * @property {string[]} platform
 * @property {'premium'|'traditional'|'health'} tone
 * @property {string} [keywords]
 */

const REQUIRED_FIELDS = [
  'title',
  'shortDescription',
  'longDescription',
  'bulletPoints',
  'seoKeywords',
  'usageStorage',
];

/**
 * Generates product description content via Gemini.
 * Same return shape and same call signature as aiService.js (OpenAI version) --
 * generate.js can swap between the two without any other code changing.
 * @param {GenerateInput} input
 * @param {{ isRegenerate?: boolean }} [options]
 */
async function generateDescription(input, options = {}) {
  const prompt = buildPrompt(input, { temperatureHint: options.isRegenerate });

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: options.isRegenerate ? 1.1 : 0.8,
      // Raised again: 3072 still wasn't enough -- real responses were being cut off
      // mid-JSON (missing closing brace) before reaching valid end-of-object.
      // Gemini 3.x's thinking overhead + genuinely long content descriptions need
      // real headroom. If truncation still happens, raise further (try 6144) or
      // trim REQUIRED_FIELDS' verbosity in promptBuilder.js's target word counts.
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
      // Gemini 3.x config -- see MODEL_NAME comment above. Do NOT use
      // thinkingBudget here; that shape belongs to the 2.5 series only.
      thinkingConfig: { thinkingLevel: 'minimal' },
    },
  });

  // Some SDK versions expose `.text` as a getter property, others as a method --
  // handle both so this doesn't silently fail on a version mismatch.
  const raw = typeof response.text === 'function' ? response.text() : response.text;
  if (!raw) {
    console.error('--- Gemini response had no text. Full response object: ---');
    console.error(JSON.stringify(response, null, 2));
    throw new Error('Empty response from Gemini');
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Gemini occasionally wraps JSON in ```json fences despite responseMimeType --
    // strip fences once and retry before giving up.
    const stripped = raw.replace(/```json|```/g, '').trim();
    try {
      parsed = JSON.parse(stripped);
    } catch {
      // TEMP DEBUG: log the actual raw text so we can see what Gemini sent.
      // Remove this console.log once the format issue is diagnosed.
      console.error('--- RAW GEMINI RESPONSE (failed to parse) ---');
      console.error(raw);
      console.error('--- END RAW GEMINI RESPONSE ---');

      // A response that doesn't end with '}' almost always means maxOutputTokens
      // was hit mid-generation (truncation), not a genuine formatting error --
      // flag that distinction clearly so it's not confused with a prompt/schema bug.
      const looksTruncated = !stripped.trim().endsWith('}');
      throw new Error(
        looksTruncated
          ? 'Gemini response was truncated before completing valid JSON (raise maxOutputTokens)'
          : 'Gemini returned invalid JSON'
      );
    }
  }

  const missing = REQUIRED_FIELDS.filter((k) => !(k in parsed));
  if (missing.length) {
    throw new Error(`Gemini response missing fields: ${missing.join(', ')}`);
  }

  return parsed;
}

module.exports = { generateDescription };