const Joi = require('joi');

const account = {
  body: {
    name: Joi.string().required(),
    amount: Joi.number().required(),
  }
};

const create = { ...account };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...account
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

module.exports = {
  create,
  update,
  get,
  remove,
};