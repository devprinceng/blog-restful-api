const { User } = require("../models");
const hashPassword = require("../utils/hashedPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEMailVerification = require("../utils/sendEmailVerification");

//register controller
const register = async (req, res, next) => {
  try {
    const { name, email, password, password_confirm, role } = req.body;

    //* lets check if email exist on DB
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.status(400);
      throw new Error("Email already exist");
    }

    //hash password
    const password_hash = await hashPassword(password);

    //create new user
    const newUser = await User({ name, email, password: password_hash, role });

    await newUser.save();
    // send response
    return res.status(201).json({
      code: 201,
      status: true,
      message: "User Created Successul",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if username exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    //check password match
    const matched = await comparePassword(password, user.password);

    //compare password
    if (!matched) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    //token
    const token = generateToken(user);

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Login Successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

//verifyemail controller
const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }

    //check if user is verified
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }

    const code = generateCode(6);

    //set the verification code of the user in db
    user.verificationCode = code;
    await user.save();

    // send email to user
    await sendEMailVerification({
      emailTo: user.email,
      subject: "Verification Code",
      code,
      content: "verify your new account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Verification Code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

//*verify user controller method
const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    //find user
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }

    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Code is Invalid");
    }

    //! verify user
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "User verified Successfully" });
  } catch (error) {
    next(error);
  }
};

//* send forgot password controller
const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not Found");
    }
    //* generate password code
    const code = generateCode(6);
    //* set the code in db
    user.forgotPasswordCode = code;
    await user.save();

    // send email to user
    await sendEMailVerification({
      emailTo: user.email,
      subject: "Forgot Password code",
      code,
      content: "Use this Code to confirm password change",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Forgot password code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
//* recover password controller
const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 400;
      throw new Error("User not Found");
    }

    if (user.forgotPasswordCode !== code) {
      res.code = 400;
      throw new Error("Invalid Password code");
    }

    //* hash password
    const hashedPassword = await hashPassword(password);
    //*save new password
    user.password = hashedPassword;
    user.forgotPasswordCode = null; //reset the field to null since password has been recovered
    await user.save();

    //! send response back to client
    res.status(200).json({
      code: 200,
      status: true,
      message: "Password Recovered successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
};
