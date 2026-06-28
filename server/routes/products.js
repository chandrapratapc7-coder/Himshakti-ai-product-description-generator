// server/routes/products.js
// CRUD + Search routes for saved product listings.
// In-memory storage — will be replaced with MongoDB in Week 5.
//
// Endpoints:
//   GET    /api/products              — list all (with optional ?platform= filter)
//   GET    /api/products/search?q=   — search by product name / category
//   GET    /api/products/:id         — get single product
//   POST   /api/products             — save new product
//   PUT    /api/products/:id         — update existing product
//   DELETE /api/products/:id         — remove product

const express = require("express");
const router = express.Router();

// ── In-memory "database" ─────────────────────────────────────────────────
let products = [];

// ── GET /api/products — list all, optional ?platform= filter ─────────────
router.get("/", (req, res) => {
  const { platform } = req.query;
  let result = products;

  if (platform) {
    result = products.filter((p) =>
      Array.isArray(p.platforms)
        ? p.platforms.includes(platform)
        : p.platform === platform
    );
  }

  res.status(200).json(result);
});

// ── GET /api/products/search?q= — MUST be before /:id ───────────────────
router.get("/search", (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const query = q.toLowerCase().trim();
  const results = products.filter(
    (p) =>
      (p.productName  && p.productName.toLowerCase().includes(query)) ||
      (p.category     && p.category.toLowerCase().includes(query))    ||
      (p.tone         && p.tone.toLowerCase().includes(query))
  );

  res.status(200).json(results);
});

// ── GET /api/products/:id — get single product ───────────────────────────
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(product);
});

// ── POST /api/products — save a new product ──────────────────────────────
router.post("/", (req, res) => {
  const data = req.body || {};

  if (!data.productName) {
    return res.status(400).json({ error: "productName is required" });
  }

  const product = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  };

  products.unshift(product);
  res.status(201).json(product);
});

// ── PUT /api/products/:id — update an existing product ───────────────────
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Merge existing product with new data; preserve id and createdAt
  const updated = {
    ...products[index],
    ...req.body,
    id,
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  res.status(200).json(updated);
});

// ── DELETE /api/products/:id — remove a product ──────────────────────────
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const exists = products.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Product not found" });
  }

  products = products.filter((p) => p.id !== id);
  res.status(200).json({ message: "Deleted successfully", id });
});

module.exports = router;