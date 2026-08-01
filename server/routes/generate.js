const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { generateLimiter } = require('../middleware/rateLimiters');
const { validateGenerateInput, validateObjectIdParam } = require('../middleware/validators');
const GeneratedDescription = require('../models/GeneratedDescription');
const { generateMockDescription } = require('../services/mockAiService');

// --- AI provider switch (Day 3: "OpenAI or Gemini") ---
// Set AI_PROVIDER=openai or AI_PROVIDER=gemini in .env -- no code changes needed to swap.
const AI_PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();

const providerKeyPresent =
  AI_PROVIDER === 'gemini' ? !!process.env.GEMINI_API_KEY : !!process.env.OPENAI_API_KEY;

const USE_MOCK = !providerKeyPresent || process.env.AI_MODE === 'mock';

// Lazily require only the service that's actually configured, so a missing
// SDK for the unused provider never breaks the app.
function getGenerateDescription() {
  if (AI_PROVIDER === 'gemini') {
    return require('../services/geminiService').generateDescription;
  }
  return require('../services/aiService').generateDescription;
}

// Fields a user is allowed to hand-edit after generation (Week 8: Update flow).
// Deliberately excludes user, product, productName, category, platform, tone --
// those define WHAT was generated and changing them without regenerating would
// leave the content inconsistent with its own metadata. Only the generated
// content itself is editable here.
const EDITABLE_FIELDS = [
  'title',
  'shortDescription',
  'longDescription',
  'bulletPoints',
  'seoKeywords',
  'usageStorage',
];

// --- POST /api/generate ---
router.post('/', protect, generateLimiter, validateGenerateInput, async (req, res) => {
  const input = req.body;
  let aiOutput;
  let usedFallback = false;

  try {
    const generateDescription = getGenerateDescription();
    aiOutput = USE_MOCK
      ? generateMockDescription(input)
      : await generateDescription(input);
  } catch (err) {
    // Real AI call failed (rate limit, outage, malformed response) -- fall back
    // to mock content rather than showing the user a hard error.
    console.error('AI generation failed, falling back to mock:', err.message);
    aiOutput = generateMockDescription(input);
    usedFallback = true;
  }

  try {
    const saved = await GeneratedDescription.create({
      user: req.user._id,
      productName: input.productName,
      category: input.category,
      platform: input.platform,
      tone: input.tone,
      // Week 8: optional base64 product image from ProductForm's upload.
      image: input.image || null,
      ...aiOutput,
    });

    res.status(201).json({
      success: true,
      data: saved,
      meta: { usedFallback },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save generated description', error: err.message });
  }
});

// --- POST /api/generate/regenerate/:id -- regenerate content for an existing entry ---
router.post('/regenerate/:id', protect, generateLimiter, validateObjectIdParam, async (req, res) => {
  try {
    const existing = await GeneratedDescription.findOne({ _id: req.params.id, user: req.user._id });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    const input = {
      productName: existing.productName,
      ingredients: req.body.ingredients || '',
      weight: req.body.weight,
      category: existing.category,
      features: req.body.features || '',
      platform: existing.platform,
      tone: existing.tone,
      keywords: req.body.keywords,
    };

    let aiOutput;
    let usedFallback = false;
    try {
      const generateDescription = getGenerateDescription();
      aiOutput = USE_MOCK
        ? generateMockDescription(input)
        : await generateDescription(input, { isRegenerate: true });
    } catch (err) {
      console.error('Regenerate AI call failed, falling back to mock:', err.message);
      aiOutput = generateMockDescription(input);
      usedFallback = true;
    }

    Object.assign(existing, aiOutput);
    await existing.save();

    res.status(200).json({ success: true, data: existing, meta: { usedFallback } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Regeneration failed', error: err.message });
  }
});

// --- PATCH /api/generate/:id -- Week 8: manual edit of a saved generation's content ---
// Lets a user hand-tweak the AI output (fix a typo, tighten a bullet, etc.)
// without triggering a fresh AI call or losing their other saved fields.
router.patch('/:id', protect, validateObjectIdParam, async (req, res) => {
  try {
    const existing = await GeneratedDescription.findOne({ _id: req.params.id, user: req.user._id });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    // Only apply whitelisted fields that were actually sent -- prevents a
    // partial/malformed request from wiping fields the user didn't touch,
    // and prevents editing fields like category/tone/platform through this route.
    EDITABLE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        existing[field] = req.body[field];
      }
    });

    await existing.save();

    res.status(200).json({ success: true, data: existing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
});

// --- GET /api/generate -- list current user's saved generations ---
router.get('/', protect, async (req, res) => {
  const items = await GeneratedDescription.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: items });
});

// --- GET /api/generate/:id ---
router.get('/:id', protect, validateObjectIdParam, async (req, res) => {
  const item = await GeneratedDescription.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: item });
});

// --- DELETE /api/generate/:id ---
router.delete('/:id', protect, validateObjectIdParam, async (req, res) => {
  const deleted = await GeneratedDescription.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, message: 'Deleted' });
});

module.exports = router;