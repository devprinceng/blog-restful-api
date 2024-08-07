const { User } = require("../models");

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User({name, email, password, role});

        await newUser.save();
        // send response
        return res.status(201).json({message: "User Created Successul", data: newUser})
    } catch (error) {
        next(error)
    }
}

module.exports = { register }