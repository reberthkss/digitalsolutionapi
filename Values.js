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
    selectedCustomer: String,
    selectedService: String,
    selectedProduct: String,
    paymentMethod: String,
    isProduct: Boolean,
    isService: Boolean,
    price: {
        type: Number,
        required: true
    },
    status: String,
    ref: String,
})

const Values = new mongoose.model('values', valuesSchema);

module.exports = Values;
