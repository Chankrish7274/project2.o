const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRequests)
    .post(protect, createRequest);

router.put('/:id', protect, authorize('Manager', 'CEO'), updateRequestStatus);

module.exports = router;
