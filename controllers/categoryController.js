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

//* update category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const { _id } = req.user;

    //* get category
    const category = await Category.findById(id);
    if (!category) {
      res.code = 404;
      throw new Error("Category does not exist");
    }

    //* check if category exist
    const isCategoryExist = await Category.findOne({ title });
    if (
      isCategoryExist &&
      isCategoryExist.title === title &&
      String(isCategoryExist._id) !== String(category._id)
    ) {
      res.code = 404;
      throw new Error("Title already exist");
    }

    //* save category details
    category.title = title ? title : category.title;
    category.description = description;
    category.updatedBy = _id;
    //* save
    await category.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

//delete category controller
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    //* confirm category exist
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
      res.code = 404;
      throw new Error("Category does not exists");
    }
    //* delete category
    await Category.findByIdAndDelete(id);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
//search category
const searchCategory = async (req, res, next) => {
  //get title
  const { q } = req.query;
  let query = {}; //for all
  if (q) {
    const search = RegExp(q, "i"); //i for case insensitivity
    query = { $or: [{ title: search }, { description: search }] }; //use regex
  }

  const categories = await Category.find(query);

  res.status(200).json({
    code: 200,
    status: true,
    message: "Get Categories sucessfully",
    data: { categories },
  });
};

module.exports = {
  addCategory,
  searchCategory,
  updateCategory,
  deleteCategory,
};
