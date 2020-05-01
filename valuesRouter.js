const mongoose = require('mongoose');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Router =  express.Router();
const {secret} = require('./const');
const Values = require('./Values');
const conDb = require('./conMainBase');

Router.post(
    '/values',
    async (req, res) => {
        await conDb();
        const {token} = req.body;
        let userId = null;
        try {
            const decoded = jwt.verify(token, secret);
            userId = decoded.username.id;
        } catch(e) {
            return res.status(400).json({message: e.message})
        }

    let obj = req.body;
        obj.userId = userId;
        const {type, date, selectedCustomer, selectedService, selectedProduct, paymentMethod, isProduct, isService, price, status, ref} = obj;

// VALUES
    if (obj.type === 'insertCredit') {
            const newValue = Values({userId, type, date, selectedCustomer, selectedService, selectedProduct, paymentMethod, isProduct, isService, price, status, ref})
            try {
                const value = await newValue.save();
                return res.send({inserted: true, id: value._id});
            } catch(e) {
                return res.status(400).json({message: e.message})
            }
    }

    if( obj.type === 'getCredit') {
        try {
            const values = await Values.find({userId});
            return res.send(values);
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }

    if (obj.type === 'remove_value') {
        try {
            const deletedValues = await Values.deleteOne({userId, _id: obj.id});
            return res.send({deleted: true});
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }

    if (obj.type === 'updateValue') {
        try {
            const updatedValue = await Values.updateOne({userId, _id: obj.id}, {...obj});
            console.log(updatedValue);
            return res.send({updated:true, id: obj.id});
        } catch(e) {
            return res.status(400).json({message: e.message})
        }
    }
})

module.exports = Router;
