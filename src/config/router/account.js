const { Router } = require('express');

const AccountController = require('../../controllers/account');
const { authJwt } = require('../../services/auth');
const validator = require('express-validation');
const validatorSchema = require('../validator/account');

const router = new Router();

// crud operations
router.post("/account", authJwt, validator(validatorSchema.create), AccountController.create);
router.get("/account/:id", authJwt, validator(validatorSchema.get), AccountController.get);
router.put('/account/:id', authJwt, validator(validatorSchema.update), AccountController.update);
router.delete('/account/:id', authJwt, validator(validatorSchema.remove), AccountController.remove);

// other operations
router.get("/accounts", authJwt, AccountController.list);

module.exports = router;