const {anon, user} = require('./passwords');
const URL_AUTH = `mongodb+srv://anon:${anon}@cluster0-ctrcj.gcp.mongodb.net/authentications?retryWrites=true&w=majority`;
const URL_BASE = `mongodb+srv://pangolinha:${user}@cluster0-ctrcj.gcp.mongodb.net/mainbase?retryWrites=true&w=majority`;
const secret = 'strogonoffdefrango';
const secretPass = 'banana';
module.exports.URLAUTH = URL_AUTH;
module.exports.URLBASE = URL_BASE;
module.exports.secret = secret;
module.exports.secretPass = secretPass;
