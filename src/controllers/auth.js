const HTTPStatus = require('http-status');
const User = require('../models/user');

exports.signup = async function(req, res, next) {
  let user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };

  try {
    const result = await User.create(user);
    res.json(result);
  } catch (error) {
    res.json({message: error.toString()});
  }
};

exports.signin = async function(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

  return next();
};