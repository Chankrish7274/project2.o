const express = require('express');
const router = express.Router();
const { getEmployees, getSystemStats } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('Manager', 'CEO'), getEmployees);
router.get('/stats', protect, authorize('Manager', 'CEO'), getSystemStats);

module.exports = router;
