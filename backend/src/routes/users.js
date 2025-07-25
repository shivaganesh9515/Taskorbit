const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Users routes are working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;