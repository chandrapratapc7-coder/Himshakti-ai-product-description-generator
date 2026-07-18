const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
});

// --- POST /api/auth/register ---
router.post(
  '/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: 'An account with this email already exists' });
      }

      const user = await User.create({ name, email, password });
      const token = signToken(user);

      res.cookie('token', token, cookieOptions);
      res.status(201).json({ success: true, token, user: sanitizeUser(user) });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
    }
  }
);

// --- POST /api/auth/login ---
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = signToken(user);
      res.cookie('token', token, cookieOptions);
      res.status(200).json({ success: true, token, user: sanitizeUser(user) });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Login failed', error: err.message });
    }
  }
);

// --- GET /api/auth/me ---
router.get('/me', protect, (req, res) => {
  res.status(200).json({ success: true, user: sanitizeUser(req.user) });
});

// --- POST /api/auth/logout ---
router.post('/logout', (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// --- GET /api/auth/google (kick off OAuth flow) ---
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// --- GET /api/auth/google/callback ---
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie('token', token, cookieOptions);

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    // Redirect back to frontend with token in query for client-side storage
    res.redirect(`${clientUrl}/oauth/callback?token=${token}`);
  }
);

module.exports = router;
