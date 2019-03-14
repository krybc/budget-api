const Category = require('../models/category');
const CategoryGroup = require('../models/categoryGroup');
const Transaction = require('../models/transaction');
const Joi = require('joi');

exports.create = async function(req, res, next) {
  console.log(req.body);
  let category = {
    group: req.body.group,
    name: req.body.name,
    type: req.body.type,
    order: 1
  };

  try {
    return res.json(await Category.create(category));
  } catch (err) {
    return next(err);
  }
};

exports.get = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    return res.json(await Category.findOne(filter));
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
    name: req.body.name
  };

  try {
    res.json(await Category.findOneAndUpdate(filter, update, { new: true }));
  } catch (err) {
    return next(err);
  }
};

exports.remove = async function(req, res, next) {
  let filter = {
    _id: req.params.id
  };

  try {
    const category = await Category.findOne(filter);

    await Transaction.deleteMany({ category: category._id });

    res.json(await Category.findOneAndRemove(filter));
  } catch (err) {
    return next(err);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.list = async function(req, res, next) {
  try {
    let categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    return next(err);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.tree = async function(req, res, next) {
  try {
    const categories = await Category.find({}).sort({order: 1});
    const categoryGroups = await CategoryGroup.find({}).sort({ order: 1 }).populate('categories');

    const tree = categoryGroups.map((categoryGroup) => {
      categoryGroup.categories = categories.filter(category => {
        return category.group.toString() === categoryGroup._id.toString();
      });

      return categoryGroup;
    });

    res.json(tree);
  } catch (err) {
    return next(err);
  }
};
