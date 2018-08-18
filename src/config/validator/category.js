const Joi = require('joi');

const category = {
  body: {
    group: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    name: Joi.string().required(),
    type: Joi.number().integer().required(),
  }
};

const create = { ...category };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...category
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