const Contractor = require('../models/contractor');

exports.create = async function(req, res, next) {
  console.log(req.body);
  let item = {
    name: req.body.name,
    street: (req.body.street) ? req.body.street : null,
    city: (req.body.city) ? req.body.city : null,
  };

  try {
    return res.json(await Contractor.create(item));
  } catch (err) {
    return next(err);
  }
};

exports.get = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    return res.json(await Contractor.findOne(filter));
  } catch (err) {
    return next(err);
  }
};

/**
 * Update category
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
    street: req.body.street,
    city: req.body.city,
  };

  try {
    res.json(await Contractor.findOneAndUpdate(filter, update, { new: true }));
  } catch (err) {
    return next(err);
  }
};

exports.remove = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    res.json(await Contractor.findOneAndRemove(filter));
  } catch (err) {
    return next(err);
  }
};

exports.list = async function(req, res, next) {
  try {
    let itemList = await Contractor.find({});
    res.json(itemList);
  } catch (err) {
    return next(err);
  }
};