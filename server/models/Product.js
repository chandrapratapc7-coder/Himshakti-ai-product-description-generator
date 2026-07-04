// server/models/Product.js
// Mongoose schema for a saved HimShakti product listing.

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "productName is required"],
      trim: true,
      minlength: [3, "productName must be at least 3 characters"],
    },
    ingredients: {
      type: String,
      required: [true, "ingredients is required"],
      trim: true,
    },
    weight: {
      type: String,
      required: [true, "weight is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    platform: {
      type: String,
      trim: true,
    },
    platforms: {
      type: [String],
      default: [],
    },
    tone: {
      type: String,
      enum: ["Premium", "Traditional", "Health-focused"],
      default: "Health-focused",
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Text index for search functionality
ProductSchema.index({ productName: "text", category: "text", tone: "text" });

module.exports = mongoose.model("Product", ProductSchema);