const Account = require('../models/account');

exports.create = async function(req, res, next) {
  let account = {
    name: req.body.name,
    amount: req.body.amount,
  };

  try {
    return res.json(await Account.create(account));
  } catch (err) {
    return next(err);
  }
};

exports.get = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    return res.json(await Account.findOne(filter));
  } catch (err) {
    return next(err);
  }
};

/**
 * Update account
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.update = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  let update = {
    name: req.body.name,
    amount: req.body.amount,
  };

  try {
    res.json(await Account.findOneAndUpdate(filter, update, { new: true }));
  } catch (err) {
    return next(err);
  }
};

exports.remove = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    res.json(await Account.findOneAndRemove(filter));
  } catch (err) {
    return next(err);
  }
};

exports.list = async function(req, res, next) {
  try {
    let accounts = await Account.find({});
    res.json(accounts);
  } catch (err) {
    return next(err);
  }
};