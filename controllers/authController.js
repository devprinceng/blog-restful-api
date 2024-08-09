const { User } = require("../models");

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        
        //validations
        if(!name){
            res.code = 400;
            throw new Error('name is required');
        }
        if(!email){
            res.code = 400;
            throw new Error('email is required');
        }
        if(!password){
            res.code = 400;
            throw new Error('password is required');
        }
        if(password.length < 6){
            res.code = 400;
            throw new Error('password must be greater than 6 characters');
        }

        const newUser = await User({name, email, password, role});

        await newUser.save();
        // send response
        return res.status(201).json({code: 201, status: true, message: "User Created Successul", data: newUser})
    } catch (error) {
        next(error)
    }
}

module.exports = { register }