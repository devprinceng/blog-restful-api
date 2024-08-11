const {check} = require('express-validator');

//middleware function
const registerValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Invalid Email')
        .notEmpty()
        .withMessage('Email is required')
    ,
    check('password')
        .isLength({min: 6})
        .withMessage("Password should be 6 characters long")
        .notEmpty('Password is required')
]

module.exports = { registerValidator }