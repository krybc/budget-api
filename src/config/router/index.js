const { Router } = require('express');
const validator = require('express-validation');

const CategoryGroupRouter = require('./categoryGroup');
const CategoryRouter = require('./category');
const UserRouter = require('./user');
const AuthRouter = require('./auth');
const ShopRouter = require('./contractor');
const ExpenseRouter = require('./transaction');
const AccountRouter = require('./account');

const router = new Router();

router.use(CategoryRouter);
router.use(CategoryGroupRouter);
router.use(UserRouter);
router.use(AuthRouter);
router.use(ShopRouter);
router.use(ExpenseRouter);
router.use(AccountRouter);

router.use((err, req, res, next) => {
  console.log(err.name);
  console.log(err instanceof validator.ValidationError);
  if (err instanceof validator.ValidationError) {
    res.status(400).json(err);
  } else if (err.name !== undefined && err.name === 'ValidationError') {
    res.status(400).json(err);
  } else {
    res.status(500)
      .json({
        status: err.status,
        message: err.message
      });
  }
});

module.exports = router;
