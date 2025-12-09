const mongoose = require('mongoose');

const benchSchema = mongoose.Schema({
    benchId: {
        type: String,
        required: true,
        unique: true
    },
    building: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    occupiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bench', benchSchema);
