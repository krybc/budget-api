const express = require('express');

require('./config/database');
const middlewares = require('./config/middlewares');
const router = require('./config/router/index');

const app = express();

middlewares(app);

app.use(router);

module.exports = app;