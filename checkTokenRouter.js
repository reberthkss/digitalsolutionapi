const express = require('express');
const Router = express.Router();
const {check, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const {secret} = require('./const');

Router.post(
    '/checkToken',
    [
        check('token').not().isEmpty(),
    ],
    async (req, res) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) return res.status(400).json({message: errs});
        if (req.body.token === undefined) return res.status(400).json({message: 'Submeta um token!'});

        try {
            const isValidToken = await jwt.verify(req.body.token, secret);
            return res.send({isValid: true})
        } catch(e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }
)

module.exports = Router
