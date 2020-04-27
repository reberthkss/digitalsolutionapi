const mongoose = require('mongoose');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Router =  express.Router();
const {secret} = require('./const');
const Customer = require('./Customer');
const conDb = require('./conMainBase');

Router.post(
    '/customer',
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

        console.log(userId);
        let obj = req.body;
        obj.userId = userId;
        const {type, name, cnpj, formalName, email, fone, address, contactPerson} = obj;

// CUSTOMERS

        if (obj.type === 'insertCustomer') {
            const newCustomer  =  new Customer({userId, type, name, cnpj, formalName, email, fone, address, contactPerson});
            try {
                const value = await newCustomer.save();
                return res.send({inserted: true, id: value._id});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'getCustomers') {
           try {
               const customers = await Customer.find({userId});
               return res.send(customers);
           } catch(e) {
               return res.status(400).json({message: e.message});
           }
        }

        if (obj.type === 'updateCustomer') {
            try {
                const newCustomer = await Customer.updateOne({userId, _id: obj.id}, {...obj});
                return res.send({updated: true, id: obj.id});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'remove_customer') {
            try {
                const isDeleted = await Customer.deleteOne({userId, _id: obj.id});
                return res.send({deleted: true});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

    })

module.exports = Router;
