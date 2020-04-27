const mongoose = require('mongoose');

const valuesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    selectedCustomer: {
        type: String,
        required: false
    },
    selectedService: {
        type: String | null,
        required: false
    },
    selectedProduct: {
        type: String | null,
        required: false
    },
    paymentMethod: {
        type: String | null,
        required: false
    },
    isProduct: {
        type: Boolean,
        required: false
    },
    isService: {
        type: Boolean,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String | null,
        required: false
    },
    ref: {
        type: String | null,
        required: false
    }
})

const Values = new mongoose.model('values', valuesSchema);

module.exports = Values;
