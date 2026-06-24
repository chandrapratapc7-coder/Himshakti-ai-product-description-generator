// server/server.js
// Main Express application entry point for HimShakti backend.

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const generateRoutes = require("./routes/generate");
const productRoutes  = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ───────────────────────────────────────────────────────────────

// Health check — verify server is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "HimShakti backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Feature routes
app.use("/api/generate", generateRoutes);
app.use("/api/products", productRoutes);

// ── 404 handler (no matching route) ─────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start server ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ HimShakti backend running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
