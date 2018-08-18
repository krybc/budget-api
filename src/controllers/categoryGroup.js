const CategoryGroup = require('../models/categoryGroup');
const Joi = require('joi');

exports.create = async function(req, res, next) {
  let categoryGroup = {
    name: req.body.name,
    type: req.body.type,
    order: 1
  };

  try {
    return res.json(await CategoryGroup.create(categoryGroup));
  } catch (err) {
    return next(err);
  }
};

exports.get = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    return res.json(await CategoryGroup.findOne(filter));
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
  };

  try {
    res.json(await CategoryGroup.findOneAndUpdate(filter, update, { new: true }));
  } catch (err) {
    return next(err);
  }
};

exports.remove = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    const categoryGroup = await CategoryGroup.findOne(filter);

    const categories = await Transaction.find({group: categoryGroup._id});
    Joi.assert(categories.length, Joi.number().integer().max(0), 'Category group must not contrains any categories');

    res.json(await CategoryGroup.findOneAndRemove(filter));
  } catch (err) {
    return next(err);
  }
};