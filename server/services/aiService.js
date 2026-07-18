const OpenAI = require('openai');
const { buildPrompt } = require('./promptBuilder');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

/**
 * Generates product description content via OpenAI.
 * Same return shape as the old mockAI.ts so no caller needs to change.
 * @param {GenerateInput} input
 * @param {{ isRegenerate?: boolean }} [options] - bumps temperature + prompt
 *        variation note when regenerating, so output differs from the original.
 */
async function generateDescription(input, options = {}) {
  const prompt = buildPrompt(input, { temperatureHint: options.isRegenerate });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a precise JSON-generating copywriter. Always return valid, parseable JSON only.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: options.isRegenerate ? 1.1 : 0.8,
    max_tokens: 900,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty response from AI provider');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('AI returned invalid JSON');
  }

  // Basic shape validation so a malformed AI response never crashes the app downstream
  const required = ['title', 'shortDescription', 'longDescription', 'bulletPoints', 'seoKeywords', 'usageStorage'];
  const missing = required.filter((k) => !(k in parsed));
  if (missing.length) {
    throw new Error(`AI response missing fields: ${missing.join(', ')}`);
  }

  return parsed;
}

module.exports = { generateDescription };
