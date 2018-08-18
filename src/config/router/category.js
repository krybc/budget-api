const { Router } = require('express');

const CategoryController = require('../../controllers/category');
const { authJwt } = require('../../services/auth');
const validator = require('express-validation');
const validatorSchema = require('../validator/category');

const router = new Router();

// crud operations
router.post("/category", authJwt, validator(validatorSchema.create), CategoryController.create);
router.get("/category/:id", authJwt, validator(validatorSchema.get), CategoryController.get);
router.put('/category/:id', authJwt, validator(validatorSchema.update), CategoryController.update);
router.delete('/category/:id', authJwt, validator(validatorSchema.remove), CategoryController.remove);

// other operations
router.get("/categories", authJwt, CategoryController.list);
router.get("/categories/tree", authJwt, CategoryController.tree);

module.exports = router;