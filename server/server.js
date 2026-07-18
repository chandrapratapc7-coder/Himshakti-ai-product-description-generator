require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const { apiLimiter } = require('./middleware/rateLimiters');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
// existing Week 4/5 routes
const productRoutes = require('./routes/products');
const generateRoutes = require('./routes/generate');

const app = express();

// --- Core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api', apiLimiter); // general rate limit on all API routes

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/generate', generateRoutes);

app.get('/api/health', (req, res) => res.json({ success: true, message: 'HimShakti API is running' }));

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// --- DB + server start ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
