const { Router } = require('express');

const ContractorController = require('../../controllers/contractor');
const { authJwt } = require('../../services/auth');
const validator = require('express-validation');
const validatorSchema = require('../validator/contractor');

const router = new Router();

// crud operations
router.post("/contractor", authJwt, validator(validatorSchema.create), ContractorController.create);
router.get("/contractor/:id", authJwt, validator(validatorSchema.get), ContractorController.get);
router.put('/contractor/:id', authJwt, validator(validatorSchema.update), ContractorController.update);
router.delete('/contractor/:id', authJwt, validator(validatorSchema.remove), ContractorController.remove);

// other operations
router.get("/contractors", authJwt, ContractorController.list);


module.exports = router;