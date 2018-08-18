const Joi = require('joi');

const contractor = {
  body: {
    name: Joi.string().required(),
    street: Joi.string().optional().allow(null),
    city: Joi.string().optional().allow(null),
  }
};

const create = { ...contractor };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...contractor
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