const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
    cnpj: {
        type: String,
        required: true
    },
    formalName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    fone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactPerson: {
        type: String,
        required: true
    }
})

const Customer = new mongoose.model('customers', customerSchema);

module.exports = Customer;
