const mongoose = require('mongoose');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Router =  express.Router();
const {secret} = require('./const');
const Service = require('./Service');
const conDb = require('./conMainBase');

Router.post(
    '/services',
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
        const {type, descricao, valorizacao} = obj;

// SERVICES

        if (obj.type === 'insert_service') {
            const newService = new Service({userId, type, descricao, valorizacao});

            try {
                const service = await newService.save();
                return res.send({inserted: true, id: service._id});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'update_service') {
            try {
                const updated = await Service.updateOne({userId, _id: obj.id}, {...obj});
                return res.send({updated: true, id: obj.id});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'get_services') {
            try {
                const services = await Service.find({userId});
                return res.send(services)
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        }

        if (obj.type === 'remove_service') {
            try {
                const deleted = await Service.deleteOne({userId, _id: obj.id});
                return res.send({deleted: true});
            } catch(e) {
                return res.status(400).json({message: e.message});
            }
        };
    })

module.exports = Router;
