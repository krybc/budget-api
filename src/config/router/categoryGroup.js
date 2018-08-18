const { Router } = require('express');

const CategoryGroupController = require('../../controllers/categoryGroup');
const { authJwt } = require('../../services/auth');
const validator = require('express-validation');
const validatorSchema = require('../validator/categoryGroup');

const router = new Router();

// crud operations
router.post("/categoryGroup", authJwt, validator(validatorSchema.create), CategoryGroupController.create);
router.get("/categoryGroup/:id", authJwt, validator(validatorSchema.get), CategoryGroupController.get);
router.put('/categoryGroup/:id', authJwt, validator(validatorSchema.update), CategoryGroupController.update);
router.delete('/categoryGroup/:id', authJwt, validator(validatorSchema.remove), CategoryGroupController.remove);

module.exports = router;