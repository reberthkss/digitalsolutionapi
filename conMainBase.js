const mongoose = require('mongoose');
const {URLBASE} = require('./const');

const conMainBase = async () => {
    try {
       const con = await mongoose.connect(URLBASE, {useUnifiedTopology: true, useNewUrlParser: true});
       console.log('conectado maindb!');
    } catch(e){
        throw  Error(e.message)
    }
}

module.exports = conMainBase;
