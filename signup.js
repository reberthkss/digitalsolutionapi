const express = require('express');
const {check, validationResult} = require('express-validator');
const Router = express.Router();
const moment = require('moment')
const User = require('./User');
const bcrypt = require('bcryptjs');
const connectDb = require('./db');
const {secretPass} = require('./const');
Router.post(
    '/signup',
    [
        check('username').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min: 6}),
        check('secret').equals(secretPass)
    ],
   async (req, res) => {
       const errs = validationResult(req);
       if (!errs.isEmpty())  return res.send(errs);
        await connectDb();


        // check if have a user with this email registered
       const {username, email, password} = req.body;
       const user = await User.find({email});
       console.log(user)
       if (user.length) return res.status(400).json({
           message: 'Usuario já cadastrado!'
       });

       // CREATE NEW USER
                                                    // NEW USER RESPONSE
       let newUser = new User({                   //-> _id
           username,                                //-> username
           password,                                //-> password
           email,                                   //-> email
           createdAt: moment().valueOf(),           // -> created at
       });

       // ENCRYPT THE PASSWORD
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt);

       newUser.password = hash;

       try {
           await newUser.save();
           return res.send({success: true})
       } catch(e) {
           return res.status(400).json({
               msg: e.message
           })
       }
    }
);

module.exports = Router;
