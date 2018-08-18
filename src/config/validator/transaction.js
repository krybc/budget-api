const Joi = require('joi');

const transaction = {
  body: {
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    account: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    contractor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    income: Joi.number().allow(null),
    expense: Joi.number().allow(null),
    description: Joi.string().allow(null)
  }
};

const create = { ...transaction };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...transaction
};

const get = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }
};

const remove = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }
};

const list = {
  params: {
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().allow(null),
    contractor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().allow(null),
    dateFrom: Joi.date().optional(),
    dateTo: Joi.date().optional(),
  }
};

const summary = {
  params: {
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().allow(null),
    contractor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().allow(null),
    dateFrom: Joi.date().optional(),
    dateTo: Joi.date().optional(),
  }
};

module.exports = {
  create,
  update,
  get,
  remove,
  list,
  summary
};