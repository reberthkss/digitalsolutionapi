const mongoose = require('mongoose');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Router =  express.Router();
const {secret} = require('./const');
const Product = require('./Product');
const conDb = require('./conMainBase');

Router.post(
    '/product',
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
        const {type, name, brand, amount, priceCost, priceSell} = obj;

// PRODUCTS

        if (obj.type === 'insert_product') {
            const newProduct = new Product({userId, type, name, brand, amount, priceCost, priceSell});

            try {
                const value = await newProduct.save();
                return res.send({inserted: true, id: value._id});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'get_products') {
            try {
                const products = await Product.find({userId});
                return res.send(products);
            } catch(e) {
                return res.status(400).json({message: e.message})
            }
        }

        if (obj.type === 'remove_product') {
           try {
               const deleted = await Product.deleteOne({userId, _id: obj.id});
               return res.send({deleted: true, id: obj.id});
           } catch(e) {
               return res.status(400).json({message: e.message})
           }
        }

        if (obj.type === 'update_product') {
            try {
                const updated = await Product.updateOne({userId, _id: obj.id}, {...obj});
                return res.send({updated: true, id: obj.id});
            } catch(e) {
                return res.status(400).json({message: e.message})
            }
        }

    })

module.exports = Router;
