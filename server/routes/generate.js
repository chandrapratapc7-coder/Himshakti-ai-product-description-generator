// server/routes/generate.js
// POST /api/generate
// Generates a description (mock for now, real AI in Week 7)
// and saves the result to MongoDB via GeneratedDescription model.

const express              = require("express");
const router               = express.Router();
const GeneratedDescription = require("../models/GeneratedDescription");
const Product              = require("../models/Product");

// ── Helper: build mock AI response ───────────────────────────────────────
function buildMockResponse(data) {
  const {
    productName, ingredients, weight,
    category, features, platform, tone, keywords,
  } = data;

  const firstIngredient = (ingredients || "").split(",")[0]?.trim() || "natural ingredients";
  const toneLabel       = (tone || "Premium").toLowerCase();

  return {
    title:       `${productName} | ${category} | ${weight}`,
    shortDesc:   `A ${toneLabel} ${category.toLowerCase()} crafted from ${firstIngredient}. Perfect for customers seeking authentic Himalayan flavours.`,
    longDesc:    `Introducing ${productName} — a ${toneLabel} offering from the heart of Uttarakhand. Made with ${ingredients}, this product embodies the rich culinary heritage of the Himalayas. ${features || ""} Ideal for all age groups and available on ${platform || "your favourite platforms"}.`,
    bulletPoints:[
      `Made with ${firstIngredient} sourced from Himalayan farms`,
      features || "High quality, carefully selected ingredients",
      "No artificial preservatives or colours",
      "Traditional Pahadi recipe — authentic mountain taste",
      "Suitable for health-conscious snackers and families",
    ],
    seoKeywords: [
      productName.toLowerCase(),
      "Himalayan food",
      "Uttarakhand products",
      "natural ingredients",
      "Pahadi food",
      ...(keywords ? keywords.split(",").map((k) => k.trim()).filter(Boolean) : []),
    ].slice(0, 10),
    usageSuggestion: "Store in a cool, dry place away from direct sunlight. Best consumed within 30 days of opening. Reseal the pack after each use to retain freshness.",
  };
}

// ── POST /api/generate ────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const {
    productName, ingredients, weight, category,
    features, platform, platforms, tone, keywords,
  } = req.body || {};

  // Validation
  const missing = [];
  if (!productName)  missing.push("productName");
  if (!ingredients)  missing.push("ingredients");
  if (!category)     missing.push("category");
  if (!weight)       missing.push("weight");

  if (missing.length > 0) {
    return res.status(400).json({ error: "Missing required fields", missingFields: missing });
  }

  try {
    // 1. Save the product to MongoDB
    const product = await Product.create({
      productName,
      ingredients,
      weight,
      category,
      features: features ? [features] : [],
      platform,
      platforms: Array.isArray(platforms) ? platforms : platforms ? [platforms] : [],
      tone,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
    });

    // 2. Generate the description (mock — replace with AI in Week 7)
    const generated = buildMockResponse({
      productName, ingredients, weight, category,
      features, platform, tone, keywords,
    });

    // 3. Save the generated description linked to the product
    const savedDesc = await GeneratedDescription.create({
      productId:       product._id,
      title:           generated.title,
      shortDesc:       generated.shortDesc,
      longDesc:        generated.longDesc,
      bulletPoints:    generated.bulletPoints,
      seoKeywords:     generated.seoKeywords,
      usageSuggestion: generated.usageSuggestion,
      platform:        platform || (platforms ? platforms[0] : "Amazon"),
      tone,
    });

    // 4. Return combined response to frontend
    res.status(200).json({
      productId:       product._id,
      descriptionId:   savedDesc._id,
      title:           generated.title,
      shortDescription:generated.shortDesc,
      longDescription: generated.longDesc,
      bulletPoints:    generated.bulletPoints,
      keywords:        generated.seoKeywords,
      usage:           generated.usageSuggestion,
    });

  } catch (err) {
    console.error("POST /generate error:", err);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

module.exports = router;