const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Tasks routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Task routes (all protected)
router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;