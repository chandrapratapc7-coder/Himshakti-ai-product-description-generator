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
