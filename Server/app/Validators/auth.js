const { check,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../Helper/token')

exports.validateRegistrationRequest = [
    check('firstname')
    .notEmpty()
    .withMessage('First Name Is Required'),
    check('lastname')
    .notEmpty()
    .withMessage('Last Name Is Required'),
    check('email')
    .isEmail()
    .withMessage('Email Is Required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password Must Be ^ Characters Long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0 ) {
        return res.status(400).json({ error: errors.array()[0].msg})
    }
    next()
}

exports.requireAuthorization = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token,JWT_KEY)

    req.user = user
    next()
}