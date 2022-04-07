const { Router } = require('express');
const { check } = require('express-validator');
const { login, userRegister, tokenRenew } = require('../controllers/auth.controller');
const { fieldsValidate } = require('../middlewares/fields.validator');
const { jwtValidate } = require('../middlewares/jwt.validator');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio y debe contener un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria y debe contener al menos 6 caracteres').isLength({min: 6}),
    fieldsValidate
], login);

router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio y debe contener un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria y debe contener al menos 6 caracteres').isLength({min: 6}),
    fieldsValidate
], userRegister);

router.get('/renew', jwtValidate, tokenRenew);


module.exports = router;