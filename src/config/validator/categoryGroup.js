const Joi = require('joi');

const categoryGroup = {
  body: {
    name: Joi.string().required(),
    type: Joi.number().integer().required(),
  }
};

const create = { ...categoryGroup };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...categoryGroup
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
