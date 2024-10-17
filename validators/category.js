const { check } = require("express-validator");

//verifyUser validator
const addCategoryValidator = [
  check("title").notEmpty().withMessage("title is required"),
];

//id validator
const idValidator = [
  check("id").notEmpty().withMessage("category id is required"),
];

module.exports = { addCategoryValidator, idValidator };
