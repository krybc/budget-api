const User = require('../models/user');

export async function create(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
}