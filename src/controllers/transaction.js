const Transaction = require('../models/transaction');
const Account = require('../models/account');
const { Types } = require('mongoose');

function prepareParams(req) {
  let filters = {};

  if (req.query.category && req.query.category !== 'null') {
    filters.category = Types.ObjectId(req.query.category);
  }

  if (req.query.dateFrom) {
    filters.date = {
      $gte: new Date(req.query.dateFrom),
      $lte: new Date(req.query.dateTo)
    };
  }

  if (req.query.contractor && req.query.contractor !== 'null') {
    filters.contractor = Types.ObjectId(req.query.contractor);
  }

  let sort = {};
  if (req.query.sort) {
    sort[req.query.sort.column] = (req.query.sort.direction === 'ASC') ? -1: 1;
  } else {
    sort = {createdAt: -1}
  }

  let limit = 1000;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  return {filters, sort, limit};
}

exports.create = async (req, res, next) => {
  const transaction = {
    category: req.body.category,
    account: req.body.account,
    contractor: req.body.contractor,
    date: req.body.date,
    income: req.body.income,
    expense: req.body.expense,
    description: req.body.description
  };

  try {
    const result = await Transaction.create(transaction);

    if (transaction.income > 0) {
      await Account.findByIdAndUpdate(transaction.account, { $inc: { amount: transaction.income } });
    } else if (transaction.expense > 0) {
      await Account.findByIdAndUpdate(transaction.account, { $inc: { amount: -transaction.expense } });
    }

    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

exports.get = async (req, res, next) => {
  let filter = {
    _id: req.params.id
  };

  try {
    return res.json(await Transaction.findOne(filter).populate('category contractor account'));
  } catch (err) {
    return next(err);
  }
};

/**
 * Update expense
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.update = async (req, res, next) => {
  let filter = {
    _id: req.params.id
  };

  let update = {
    category: req.body.category,
    account: req.body.account,
    contractor: req.body.contractor,
    date: req.body.date,
    income: req.body.income,
    expense: req.body.expense,
    description: req.body.description
  };

  try {

    const record = await Transaction.findById(filter._id);
    const recordOriginal = record.toObject();

    record.set(update);

    const result = await record.save();

    if (recordOriginal.account !== record.account) {
      await Account.findByIdAndUpdate(recordOriginal.account, { $inc: { amount: recordOriginal.expense-recordOriginal.income } });
      await Account.findByIdAndUpdate(record.account, { $inc: { amount: record.income-record.expense } });
    } else {
      await Account.findByIdAndUpdate(record.account, { $inc: { amount: (record.income-record.expense)-(recordOriginal.income-recordOriginal.expense) } });
    }

    return res.json(result);

  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.remove = async (req, res, next) => {
  let filter = {
    _id: req.params.id
  };

  try {
    const record = await Transaction.findById(filter._id);

    await Account.findByIdAndUpdate(record.account, { $inc: { amount: record.expense-record.income } });

    res.json(await Transaction.findOneAndRemove(filter));
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {

  const {filters, sort, limit} = prepareParams(req);

  try {
    let transactions = await Transaction.find(filters)
      .populate('category contractor account')
      .limit(limit)
      .sort(sort)
    ;
    res.json(transactions);
  } catch (err) {
    return next(err);
  }
};

exports.summary = async (req, res, next) => {
  let result = {
    count: 0,
    income: 0,
    expense: 0
  };

  const {filters, sort, limit} = prepareParams(req);

  try {
    let transactions = await Transaction.find(filters)
      .populate('category contractor account')
      .limit(limit)
      .sort(sort)
    ;

    transactions.forEach((item) => {
      ++result.count;
      result.income += item.income;
      result.expense += item.expense;
    });

    res.json(result);
  } catch (err) {
    return next(err);
  }
};
