const mongoose = require('mongoose');
const {URLAUTH} = require('./const');

const connectDb = async () => {
    try {
        await mongoose.connect(URLAUTH, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log('in db')
    } catch(err) {
        throw Error(err.message)
    }
}

module.exports = connectDb;
