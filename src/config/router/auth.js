const { Router } = require('express');
const AuthController = require('../../controllers/auth');
const { authLocal } = require('../../services/auth');
const router = new Router();
const validator = require('express-validation');
const validatorSchema = require('../validator/user');


router.post("/auth/signin", authLocal, AuthController.signin);
router.post("/auth/signup", validator(validatorSchema.create), AuthController.signup);

module.exports = router;