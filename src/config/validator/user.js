const Joi = require('joi');

const user = {
  body: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  }
};

const create = { ...user };

const update = {
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  },
  ...user
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

const signin = {
  body: {
    email: user.body.email,
    password: user.body.password,
  }
};

module.exports = {
  create,
  update,
  get,
  remove,
  signin,
};