const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Lead', 'Task', 'User'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);
