// server/models/GeneratedDescription.js
// Mongoose schema for an AI-generated product description,
// linked to a Product via productId.

const mongoose = require("mongoose");

const GeneratedDescriptionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "productId is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    shortDesc: {
      type: String,
      required: [true, "shortDesc is required"],
      trim: true,
    },
    longDesc: {
      type: String,
      required: [true, "longDesc is required"],
      trim: true,
    },
    bulletPoints: {
      type: [String],
      default: [],
    },
    seoKeywords: {
      type: [String],
      default: [],
    },
    usageSuggestion: {
      type: String,
      trim: true,
    },
    platform: {
      type: String,
      trim: true,
    },
    tone: {
      type: String,
      enum: ["Premium", "Traditional", "Health-focused"],
      default: "Health-focused",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("GeneratedDescription", GeneratedDescriptionSchema);