const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CEO', 'Manager', 'Employee'],
        default: 'Employee'
    },
    employeeId: {
        type: String,
        unique: true,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: String, // e.g., "5 years"
        default: "0 years"
    },
    assignedBench: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bench',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
