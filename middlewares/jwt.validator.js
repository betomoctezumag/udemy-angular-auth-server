const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const jwtValidate = (req= request, res = response, next) => {

    const token = req.header('x-api-key');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No se encontró el token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
};

module.exports = { jwtValidate };