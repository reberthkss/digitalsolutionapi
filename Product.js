const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    priceCost: {
        type: String,
        required: true,
    },
    priceSell: {
        type: String,
        required: true
    }
});

const Product = new mongoose.model('products', productSchema);

module.exports = Product;
