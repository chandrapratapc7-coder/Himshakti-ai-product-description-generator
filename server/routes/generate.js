// server/routes/generate.js
// POST /api/generate
// Accepts product details and returns generated description content.
// Currently returns a MOCK response — will be replaced with a real
// OpenAI / Gemini API call in Week 7.

const express = require("express");
const router = express.Router();

// ── Helper: build mock AI response ───────────────────────────────────────
function buildMockResponse(data) {
  const {
    productName,
    ingredients,
    weight,
    category,
    features,
    platform,
    tone,
    keywords,
  } = data;

  const firstIngredient = (ingredients || "").split(",")[0]?.trim() || "natural ingredients";
  const toneLabel = (tone || "Premium").toLowerCase();

  return {
    title: `${productName} | ${category} | ${weight}`,

    shortDescription: `A ${toneLabel} ${category.toLowerCase()} crafted from ${firstIngredient}. ` +
      `Perfect for customers seeking authentic Himalayan flavours.`,

    longDescription: `Introducing ${productName} — a ${toneLabel} offering from the heart of ` +
      `Uttarakhand. Made with ${ingredients}, this product embodies the rich culinary heritage ` +
      `of the Himalayas. ${features || ""} Ideal for all age groups and available on ` +
      `${platform || "your favourite platforms"}.`,

    bulletPoints: [
      `Made with ${firstIngredient} sourced from Himalayan farms`,
      features || "High quality, carefully selected ingredients",
      "No artificial preservatives or colours",
      "Traditional Pahadi recipe — authentic mountain taste",
      "Suitable for health-conscious snackers and families",
    ],

    keywords: [
      productName.toLowerCase(),
      "Himalayan food",
      "Uttarakhand products",
      "natural ingredients",
      "Pahadi food",
      ...(keywords ? keywords.split(",").map((k) => k.trim()).filter(Boolean) : []),
    ].slice(0, 10),

    usage: "Store in a cool, dry place away from direct sunlight. Best consumed within " +
      "30 days of opening. Reseal the pack after each use to retain freshness.",
  };
}

// ── POST /api/generate ────────────────────────────────────────────────────
router.post("/", (req, res) => {
  const {
    productName,
    ingredients,
    weight,
    category,
    features,
    platform,
    tone,
    keywords,
  } = req.body || {};

  // ── Validation ──
  const missing = [];
  if (!productName)  missing.push("productName");
  if (!ingredients)  missing.push("ingredients");
  if (!category)     missing.push("category");
  if (!weight)       missing.push("weight");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields: missing,
    });
  }

  try {
    const result = buildMockResponse({
      productName,
      ingredients,
      weight,
      category,
      features,
      platform,
      tone,
      keywords,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error generating description:", err);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;
