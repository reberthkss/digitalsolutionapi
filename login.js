const User = require('./User');
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./const');
const connectDb = require('./db');


Router.post(
    '/login',
    async (req, res) => {
        await connectDb();
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({message: 'Por favor, insira o usuario e a senha!'})

        // FIND USER
        const haveUser = await User.find({username});
        if (!haveUser.length)  return res.status(400).json({message: 'Nenhum usuário encontrado!!'});
        // CHECK PASSWD
        const isCorrectlyPassword = await bcrypt.compare(password, haveUser[0].password);
        const id =  haveUser.id;

        if (isCorrectlyPassword) {

            const token =  await jwt.sign({
                username: {
                    id: haveUser[0]._id,
                }
            },
             secret,
                {
                    expiresIn: '1h'
                });
            return res.send({auth: true, token})
        } else {
            return res.status(400).json({message: 'Senha incorreta!'})
        }
    })

module.exports = Router;
