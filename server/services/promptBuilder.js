/**
 * promptBuilder.js
 * Dynamically assembles the AI prompt from form input.
 * Kept separate from aiService.js so prompt logic can be tested,
 * tuned, and console.logged independently of the API call itself.
 */

const TONE_GUIDANCE = {
  premium: 'sophisticated, aspirational language emphasizing craftsmanship and quality',
  traditional: 'warm, heritage-focused language emphasizing authenticity and Himalayan roots',
  health: 'clear, benefit-driven language emphasizing nutrition and wellness',
};

// Platform-specific instructions — content differs meaningfully by marketplace
const PLATFORM_GUIDANCE = {
  Amazon: 'Amazon SEO conventions: keyword-rich title under 200 characters, benefit-led bullets, formal tone.',
  Flipkart: 'Flipkart conventions: concise title, highlight specifications and value for money.',
  Meesho: 'Meesho conventions: simple, friendly language for value-conscious resellers and buyers.',
  Instagram: 'Instagram caption style: short, punchy, emoji-friendly, hook-driven opening line.',
  WhatsApp: 'WhatsApp catalog style: brief, direct, conversational, easy to forward.',
  D2C: 'Direct-to-consumer website style: storytelling, brand voice, slightly longer form.',
};

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
 * Builds the full prompt string sent to the AI provider.
 * @param {GenerateInput} input
 * @param {{ temperatureHint?: boolean }} [options] - set temperatureHint true on regenerate
 *        so the prompt itself nudges the model toward a fresh phrasing.
 * @returns {string}
 */
function buildPrompt(input, options = {}) {
  const { productName, ingredients, weight, category, features, platform, tone, keywords } = input;

  const platformInstructions = platform
    .map((p) => `  - ${p}: ${PLATFORM_GUIDANCE[p] || 'Standard e-commerce listing conventions.'}`)
    .join('\n');

  const variationNote = options.temperatureHint
    ? '\nThis is a REGENERATION request — produce noticeably different phrasing and structure from a typical first draft, while keeping all facts accurate.\n'
    : '';

  return `You are an expert e-commerce copywriter for HimShakti, a Himalayan food processing brand.
${variationNote}
Write product listing content for:
- Product: ${productName}
- Key ingredients: ${ingredients}
- Weight/quantity: ${weight || 'not specified'}
- Category: ${category}
- Features: ${features}
- Tone: ${tone} — use ${TONE_GUIDANCE[tone]}
${keywords ? `- Target keywords to naturally include: ${keywords}` : ''}

Target platforms and their conventions:
${platformInstructions}

Return ONLY a valid JSON object with this exact shape, no markdown fences, no preamble:
{
  "title": "string, under 80 characters, platform-optimised product title",
  "shortDescription": "string, 50-80 words",
  "longDescription": "string, 150-250 words",
  "bulletPoints": ["5 to 7 short feature bullet strings"],
  "seoKeywords": ["8 to 12 relevant keyword strings"],
  "usageStorage": "string, 1-2 sentences on usage and storage suggestions"
}`;
}

module.exports = { buildPrompt };

// --- Manual test (Day 1-2 requirement): run `node promptBuilder.js` to sanity-check output ---
if (require.main === module) {
  const sample = {
    productName: 'Buransh Juice',
    ingredients: 'Rhododendron flowers, sugar, water',
    weight: '500ml',
    category: 'Juices',
    features: 'No preservatives, cold-pressed, antioxidant-rich',
    platform: ['Amazon', 'Instagram'],
    tone: 'health',
    keywords: 'himalayan juice, natural antioxidant',
  };

  console.log('--- Standard prompt ---\n');
  console.log(buildPrompt(sample));

  console.log('\n\n--- Regeneration prompt (temperatureHint) ---\n');
  console.log(buildPrompt(sample, { temperatureHint: true }));
}
