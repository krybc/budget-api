const express = require('express');

require('./config/database');
const middlewares = require('./config/middlewares');
const router = require('./config/router/index');

const server = express();

middlewares(server);

server.use(router);

module.exports = server;
