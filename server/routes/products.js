// server/routes/products.js
// CRUD routes for saved product listings.
// Currently uses in-memory storage — will be replaced with MongoDB
// in Week 5.

const express = require("express");
const router = express.Router();

// ── In-memory "database" ─────────────────────────────────────────────────
let products = [];

// ── POST /api/products — save a new product ─────────────────────────────
router.post("/", (req, res) => {
  const data = req.body || {};

  if (!data.productName) {
    return res.status(400).json({ error: "productName is required" });
  }

  const product = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  products.unshift(product); // newest first
  res.status(201).json(product);
});

// ── GET /api/products — fetch all saved products ─────────────────────────
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// ── GET /api/products/:id — fetch a single product ───────────────────────
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(product);
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
