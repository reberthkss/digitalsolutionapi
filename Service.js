const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valorizacao:{
        type: String,
        required: true
    }
})

const Service = new mongoose.model('services', serviceSchema);

module.exports = Service;
