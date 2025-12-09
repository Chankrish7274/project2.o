const User = require('../models/User');
const Bench = require('../models/Bench');
const Request = require('../models/Request');

// @desc    Get all employees (with filters)
// @route   GET /api/users
// @access  Private (Manager/CEO)
const getEmployees = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                    { skills: { $regex: req.query.search, $options: 'i' } },
                ],
            }
            : {};

        const users = await User.find({ ...keyword, role: 'Employee' }).populate('assignedBench');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get System Stats
// @route   GET /api/users/stats
// @access  Private (Manager/CEO)
const getSystemStats = async (req, res) => {
    try {
        const totalBenches = await Bench.countDocuments();
        const occupiedBenches = await Bench.countDocuments({ status: 'Occupied' });
        const availableBenches = totalBenches - occupiedBenches;
        const totalEmployees = await User.countDocuments({ role: 'Employee' });
        const pendingRequests = await Request.countDocuments({ status: 'Pending' });

        res.status(200).json({
            totalBenches,
            occupiedBenches,
            availableBenches,
            occupancyRate: totalBenches ? Math.round((occupiedBenches / totalBenches) * 100) : 0,
            totalEmployees,
            pendingRequests
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployees,
    getSystemStats
};
