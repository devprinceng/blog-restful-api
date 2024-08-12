const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/')
const { registerValidator } = require('../validators/auth')
const validate = require('../validators/validate')

router.post('/register', registerValidator, validate, authController.register)

module.exports = router; 