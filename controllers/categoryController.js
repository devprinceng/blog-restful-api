const { User } = require("../models");
const Category = require("../models/Category");

const addCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user;

    //* confirm category exist
    const categoryExist = await Category.findOne({ title });
    if (categoryExist) {
      res.code = 400;
      res
        .status(400)
        .json({ code: 400, status: false, message: "Category already exists" });
    }
    //*confirm user
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    // save category
    const newCategory = await Category.create({
      title,
      description,
      updatedBy: user._id,
    });

    res.status(201).json({
      code: 201,
      status: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addCategory };
