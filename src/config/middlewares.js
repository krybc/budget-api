const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const passport = require('passport');
const ev = require('express-validation');

module.exports = app => {
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(methodOverride());
  app.use(errorHandler());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
};
