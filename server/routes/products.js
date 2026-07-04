// server/routes/products.js
// CRUD + Search routes using MongoDB via Mongoose.
// Replaces the previous in-memory array implementation.

const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");

// ── GET /api/products — list all with optional pagination ─────────────────
router.get("/", async (req, res) => {
  try {
    const page     = parseInt(req.query.page)  || 1;
    const limit    = parseInt(req.query.limit) || 10;
    const skip     = (page - 1) * limit;
    const platform = req.query.platform;

    const filter = platform ? { platforms: platform } : {};

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ── GET /api/products/search?q= — MUST be before /:id ────────────────────
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const regex    = new RegExp(q.trim(), "i"); // case-insensitive
    const products = await Product.find({
      $or: [
        { productName: regex },
        { category:    regex },
        { tone:        regex },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    console.error("GET /products/search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// ── GET /api/products/:id — get single product ────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ── POST /api/products — save a new product ───────────────────────────────
router.post("/", async (req, res) => {
  try {
    const {
      productName, ingredients, weight, category,
      features, platform, platforms, tone, keywords,
    } = req.body;

    const product = new Product({
      productName,
      ingredients,
      weight,
      category,
      features: Array.isArray(features) ? features : features ? [features] : [],
      platform,
      platforms: Array.isArray(platforms) ? platforms : platforms ? [platforms] : [],
      tone,
      keywords: Array.isArray(keywords) ? keywords : keywords ? [keywords] : [],
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: messages });
    }
    console.error("POST /products error:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

// ── PUT /api/products/:id — update an existing product ───────────────────
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: messages });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ── DELETE /api/products/:id — remove a product ───────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Deleted successfully", id: req.params.id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;