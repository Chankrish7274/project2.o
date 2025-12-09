const Request = require('../models/Request');
const User = require('../models/User');

// @desc    Create a request
// @route   POST /api/requests
// @access  Private (Employee)
const createRequest = async (req, res) => {
    const { type, description } = req.body;

    try {
        const request = await Request.create({
            requester: req.user.id,
            type,
            description
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private (Manager/CEO see all, Employee sees own)
const getRequests = async (req, res) => {
    try {
        let requests;
        if (req.user.role === 'Employee') {
            requests = await Request.find({ requester: req.user.id }).populate('requester', 'name employeeId');
        } else {
            requests = await Request.find().populate('requester', 'name employeeId');
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private (Manager/CEO)
const updateRequestStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRequest,
    getRequests,
    updateRequestStatus
};
