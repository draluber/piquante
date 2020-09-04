const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const {check} = require('express-validator');

router.post('/signup',[
            check('email', 'email invalide!').not().isEmpty().isEmail().normalizeEmail().withMessage('email invalide !'),
            check('password', 'min 4 caracteres !').not().isEmpty().isLength({min: 4}).withMessage('minimum 4 caracteres !')
                     ],
            userCtrl.signup);


router.post('/login',userCtrl.login);

module.exports = router;