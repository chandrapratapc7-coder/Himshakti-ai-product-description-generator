const { GoogleGenAI } = require('@google/genai');
const { buildPrompt } = require('./promptBuilder');

// New unified SDK (replaces the deprecated @google/generative-ai package).
// Reads GEMINI_API_KEY from env automatically if no apiKey is passed explicitly,
// but we pass it explicitly here to be unambiguous about where the key comes from.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
 * Same return shape and same call signature as aiService.js (OpenAI version) —
 * generate.js can swap between the two without any other code changing.
 * @param {GenerateInput} input
 * @param {{ isRegenerate?: boolean }} [options]
 */
async function generateDescription(input, options = {}) {
  const prompt = buildPrompt(input, { temperatureHint: options.isRegenerate });

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: prompt,
    config: {
      temperature: options.isRegenerate ? 1.1 : 0.8,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
      // Newer Gemini models spend part of maxOutputTokens on internal "thinking"
      // tokens before writing visible output. Disabling thinking (or setting a
      // small budget) ensures the full token limit goes to the actual JSON.
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  // Some SDK versions expose `.text` as a getter property, others as a method —
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
    // Gemini occasionally wraps JSON in ```json fences despite responseMimeType —
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
      throw new Error('Gemini returned invalid JSON');
    }
  }

  const missing = REQUIRED_FIELDS.filter((k) => !(k in parsed));
  if (missing.length) {
    throw new Error(`Gemini response missing fields: ${missing.join(', ')}`);
  }

  return parsed;
}

module.exports = { generateDescription };