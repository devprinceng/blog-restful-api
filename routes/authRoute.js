const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/");
const {
  registerValidator,
  recoverPasswordValidator,
} = require("../validators/auth");
const { loginValidator } = require("../validators/auth");
const { emailValidator } = require("../validators/auth");
const { verifyUserValidator } = require("../validators/auth");
const { recoverPasswordValidator } = require("../validators/auth");

const validate = require("../validators/validate");
const { recoverPassword } = require("../controllers/authController");

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
//* send forgot-password route
router.post(
  "/send-forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode
);
//* recover password route
router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);
module.exports = router;
