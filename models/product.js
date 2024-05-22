const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['chair', 'table', 'desk', 'bed'],
        required: true
    }
});

module.exports = mongoose.model('Product',productSchema);