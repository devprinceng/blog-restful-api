const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/");
const { registerValidator } = require("../validators/auth");
const { loginValidator } = require("../validators/auth");
const { emailValidator } = require("../validators/auth");
const validate = require("../validators/validate");

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);
router.post(
  "/send-verification-code",
  emailValidator,
  validate,
  authController.verifyCode
);
router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);
router.post(
  "/send-forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode
);
module.exports = router;
