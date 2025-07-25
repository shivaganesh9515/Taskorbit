const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;