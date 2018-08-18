const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  mongodb: {
    url: process.env.MONGODB_URL,
    debug: process.env.MONGODB_DEBUG
  },
  jwt : {
    secret: process.env.JWT_SECRET
  }
};