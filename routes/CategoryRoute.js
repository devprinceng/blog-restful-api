const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers/");
const { addCategoryValidator, idValidator } = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { searchCategory } = require("../controllers/categoryController");

//add category route
router.post(
  "/",
  isAuth,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);
//update category route
router.put(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.updateCategory
);
//delete category route
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.deleteCategory
);
//serach category route
router.get("/", isAuth, searchCategory);
module.exports = router;
