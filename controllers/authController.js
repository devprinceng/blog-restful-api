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

    //validations
    // if(!name){
    //     res.code = 400;
    //     throw new Error('name is required');
    // }
    // if(!email){
    //     res.code = 400;
    //     throw new Error('email is required');
    // }
    // if(!password){
    //     res.code = 400;
    //     throw new Error('password is required');
    // }
    // if(password.length < 6){
    //     res.code = 400;
    //     throw new Error('password must be greater than 6 characters');
    // }
    // if(password !== password_confirm){
    //     res.code = 400;
    //     throw new Error('password confirmation does not match');
    // }
    //! since we're using express validator no need keeping the above validations

    //* lets check if email exist on DB
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.status(400);
      throw new Error("Email already exist");
    }

    //hash password
    const password_hash = await hashPassword(password);
    // console.log(password_hash);
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

module.exports = { register, login, verifyCode };
