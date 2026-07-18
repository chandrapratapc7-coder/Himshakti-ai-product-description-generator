const { body, param, validationResult } = require('express-validator');

// Reusable handler — put this after any validation chain
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// --- Validation for POST /api/generate ---
const validateGenerateInput = [
  body('productName')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name must be under 100 characters')
    .escape(),

  body('ingredients')
    .trim()
    .notEmpty()
    .withMessage('Ingredients are required')
    .isLength({ max: 500 })
    .withMessage('Ingredients must be under 500 characters')
    .escape(),

  body('weight').optional().trim().isLength({ max: 50 }).escape(),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Snacks', 'Juices', 'Jams', 'Pickles', 'Chutneys'])
    .withMessage('Invalid category'),

  body('features')
    .trim()
    .notEmpty()
    .withMessage('Features are required')
    .isLength({ max: 500 })
    .withMessage('Features must be under 500 characters')
    .escape(),

  body('platform')
    .isArray({ min: 1 })
    .withMessage('At least one platform must be selected'),
  body('platform.*')
    .isIn(['Amazon', 'Flipkart', 'Meesho', 'Instagram', 'WhatsApp', 'D2C'])
    .withMessage('Invalid platform selected'),

  body('tone')
    .trim()
    .notEmpty()
    .withMessage('Tone is required')
    .isIn(['premium', 'traditional', 'health'])
    .withMessage('Invalid tone'),

  body('keywords').optional().trim().isLength({ max: 200 }).escape(),

  handleValidation,
];

// --- Validation for POST /api/products (create) ---
const validateProductInput = [
  body('name').trim().notEmpty().withMessage('Product name is required').isLength({ max: 100 }).escape(),
  body('category')
    .trim()
    .notEmpty()
    .isIn(['Snacks', 'Juices', 'Jams', 'Pickles', 'Chutneys'])
    .withMessage('Invalid category'),
  body('ingredients').optional().trim().isLength({ max: 500 }).escape(),
  body('weight').optional().trim().isLength({ max: 50 }).escape(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().trim().isLength({ max: 2000 }).escape(),

  handleValidation,
];

// --- Validation for PUT /api/products/:id (update) — same fields, all optional ---
const validateProductUpdate = [
  body('name').optional().trim().isLength({ max: 100 }).escape(),
  body('category')
    .optional()
    .trim()
    .isIn(['Snacks', 'Juices', 'Jams', 'Pickles', 'Chutneys'])
    .withMessage('Invalid category'),
  body('ingredients').optional().trim().isLength({ max: 500 }).escape(),
  body('weight').optional().trim().isLength({ max: 50 }).escape(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().trim().isLength({ max: 2000 }).escape(),

  handleValidation,
];

// --- Validation for any route with a Mongo ObjectId param (:id) ---
const validateObjectIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidation,
];

module.exports = {
  validateGenerateInput,
  validateProductInput,
  validateProductUpdate,
  validateObjectIdParam,
};
