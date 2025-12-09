const Bench = require('../models/Bench');
const User = require('../models/User');

// @desc    Get all benches
// @route   GET /api/benches
// @access  Private (All roles)
const getBenches = async (req, res) => {
    try {
        const benches = await Bench.find().populate('occupiedBy', 'name email employeeId');
        res.status(200).json(benches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new bench
// @route   POST /api/benches
// @access  Private (Manager/CEO)
const createBench = async (req, res) => {
    const { benchId, building, floor } = req.body;

    if (!benchId || !building || !floor) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const benchExists = await Bench.findOne({ benchId });
        if (benchExists) {
            return res.status(400).json({ message: 'Bench ID already exists' });
        }

        const bench = await Bench.create({
            benchId,
            building,
            floor,
            status: 'Available'
        });

        res.status(201).json(bench);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign user to bench
// @route   PUT /api/benches/:id/assign
// @access  Private (Manager/CEO)
const assignBench = async (req, res) => {
    const { userId } = req.body;

    try {
        const bench = await Bench.findById(req.params.id);
        const user = await User.findById(userId);

        if (!bench || !user) {
            return res.status(404).json({ message: 'Bench or User not found' });
        }

        if (bench.status === 'Occupied') {
            return res.status(400).json({ message: 'Bench is already occupied' });
        }

        if (user.assignedBench) {
            return res.status(400).json({ message: 'User already has a bench assigned' });
        }

        // Update bench and user
        bench.status = 'Occupied';
        bench.occupiedBy = user._id;
        await bench.save();

        user.assignedBench = bench._id;
        await user.save();

        res.status(200).json(bench);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Deallocate bench
// @route   PUT /api/benches/:id/deallocate
// @access  Private (Manager/CEO)
const deallocateBench = async (req, res) => {
    try {
        const bench = await Bench.findById(req.params.id);

        if (!bench) {
            return res.status(404).json({ message: 'Bench not found' });
        }

        if (bench.status === 'Available') {
            return res.status(400).json({ message: 'Bench is already available' });
        }

        const user = await User.findById(bench.occupiedBy);

        // Reset bench
        bench.status = 'Available';
        bench.occupiedBy = null;
        await bench.save();

        // Reset user if exists
        if (user) {
            user.assignedBench = null;
            await user.save();
        }

        res.status(200).json({ message: 'Bench deallocated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBenches,
    createBench,
    assignBench,
    deallocateBench
};
