const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    collection: 'user',
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  if (this.isModified('password')) {
    let salt = bcrypt.genSaltSync(5);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  return next();
});

UserSchema.methods = {

  _hashPassword(password) {

  },

  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password)
  },

  createToken() {
    return jwt.sign(
      {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName
      },
      constants.jwt.secret,
      {
        expiresIn: 60 * 60
      }
    )
  },

  toAuthJSON() {
    return {
      _id: this._id,
      token: this.createToken()
    };
  },

  toJSON() {

  }

};

let User;

module.exports = User = mongoose.model('User', UserSchema);