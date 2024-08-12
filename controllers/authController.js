const { User } = require("../models");
const hashPassword = require('../utils/hashedPassword')
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
        if(isEmailExist){
            res.status(400);
            throw new Error("Email already exist");
        }

        //hash password
        const password_hash = await hashPassword(password);
        console.log(password_hash);
        //create new user
        const newUser = await User({name, email, password:password_hash, role});

        await newUser.save();
        // send response
        return res.status(201).json({code: 201, status: true, message: "User Created Successul", data: newUser})
    } catch (error) {
        next(error)
    }
}

module.exports = { register }