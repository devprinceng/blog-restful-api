const express = require("express");
const addCategoryValidator = require("../validators/category.js");
const { categoryController } = require("../controllers/index.js");
const validate = require("../validators/validate.js");
const isAuth = require("../middlewares/isAuth.js");
const router = express.Router();

//add category route
router.post(
  "/add-category",
  addCategoryValidator,
  validate,
  isAuth,
  categoryController.addCategory
);

module.exports = router;
