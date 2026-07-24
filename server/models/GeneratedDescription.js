const mongoose = require('mongoose');

const GeneratedDescriptionSchema = new mongoose.Schema(
  {
    // --- NEW for Week 6: ties each generation to the user who made it ---
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Snacks', 'Juices', 'Jams', 'Pickles', 'Chutneys'],
      required: true,
    },
    platform: [
      {
        type: String,
        enum: ['Amazon', 'Flipkart', 'Meesho', 'Instagram', 'WhatsApp', 'D2C'],
      },
    ],
    tone: {
      type: String,
      enum: ['premium', 'traditional', 'health'],
      required: true,
    },

    // --- NEW for Week 8: optional product image, stored as a base64 data URL.
    // Kept simple (no S3/Cloudinary) since this is an internship-scale project;
    // note this will bloat document size for large images — 5MB client-side
    // cap is enforced in ProductForm.jsx before this ever reaches the request.
    image: { type: String, default: null },

    title: String,
    shortDescription: String,
    longDescription: String,
    bulletPoints: [String],
    seoKeywords: [String],
    usageStorage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('GeneratedDescription', GeneratedDescriptionSchema);