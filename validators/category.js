const { check, param } = require("express-validator");
const mongoose = require("mongoose");

//verifyUser validator
const addCategoryValidator = [
  check("title").notEmpty().withMessage("title is required"),
];

//id validator
const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Object Id");
    }
  }),
];

module.exports = { addCategoryValidator, idValidator };
