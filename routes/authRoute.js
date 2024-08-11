const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/')
const { registerValidator } = require('../validators/auth')

router.post('/register', registerValidator,  authController.register)

module.exports = router;