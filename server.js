const express = require('express')
const App = express();
const bodyParser = require('body-parser')
const connDB = require('./db');
const signup = require('./signup');
const login = require('./login');
const values = require('./valuesRouter');
const customer = require('./customerRouter');
const product = require('./productRouter');
const service = require('./serviceRouter');
const checkToken = require('./checkTokenRouter');
//connDB();
// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
App.use(bodyParser.json())


App.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

App.get('/', (req, res) => {
	res.send("welcome!")
})
App.post('/', (req, res) => {
    const body = req.body;
    res.send('hello')
});

App.use('/', signup);
App.use('/', login);
App.use('/', values);
App.use('/', customer);
App.use('/', product);
App.use('/', service);
App.use('/', checkToken);

App.listen(8080, () => {
    console.log('listen in port 8080')
});
