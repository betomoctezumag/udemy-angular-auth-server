const { request, response } = require('express');
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son válidas'
            });
        }

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token: await generateJWT(user.id, user.name)
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error'
        });
    }
};

const userRegister = async(req = request, res = response) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if( user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya se encuentra registrado'
            });
        }

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name,
            email: user.email,
            token: await generateJWT(user.id, user.name)
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error'
        });
    }
};

const tokenRenew = async(req= request, res = response) => {
    const { uid } = req;

    const user = await User.findOne({ uid });

    return res.json({
        ok: true,
        uid,
        name: user.name,
        email: user.email,
        token: await generateJWT(uid, user.name)
    });
};

module.exports = { login, userRegister, tokenRenew };