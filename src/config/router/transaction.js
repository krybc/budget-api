const { Router } = require('express');
const TransactionController = require('../../controllers/transaction');
const { authJwt } = require('../../services/auth');
const validator = require('express-validation');
const validatorSchema = require('../validator/transaction');

const router = new Router();

// crud operations
router.post("/transaction", authJwt, validator(validatorSchema.create), TransactionController.create);
router.get("/transaction/:id", authJwt, validator(validatorSchema.get), TransactionController.get);
router.put('/transaction/:id', authJwt, validator(validatorSchema.update), TransactionController.update);
router.delete('/transaction/:id', authJwt, validator(validatorSchema.remove), TransactionController.remove);

router.get(
  "/transactions",
  authJwt,
  validator(validatorSchema.list),
  // sanitizeQuery('category').customSanitizer(value => {
  //   return value === 'null' ? null : value;
  // }),
  // sanitizeQuery('contractor').customSanitizer(value => {
  //   return value === 'null' ? null : value;
  // }),
  TransactionController.list
);

router.get(
  "/transactions/summary",
  authJwt,
  validator(validatorSchema.summary),
  // sanitizeQuery('category').customSanitizer(value => {
  //   return value === 'null' ? null : value;
  // }),
  // sanitizeQuery('contractor').customSanitizer(value => {
  //   return value === 'null' ? null : value;
  // }),
  TransactionController.summary
);

module.exports = router;