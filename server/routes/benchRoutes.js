const express = require('express');
const router = express.Router();
const { getBenches, createBench, assignBench, deallocateBench } = require('../controllers/benchController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getBenches)
    .post(protect, authorize('Manager', 'CEO'), createBench);

router.put('/:id/assign', protect, authorize('Manager', 'CEO'), assignBench);
router.put('/:id/deallocate', protect, authorize('Manager', 'CEO'), deallocateBench);

module.exports = router;
