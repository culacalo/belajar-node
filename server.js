require('module-alias/register');

const express = require('express');
const pino = require('express-pino-logger');
const bodyParser = require('body-parser');
const server = require('@config/server.js');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(pino);

const port = process.env.PORT || server.port;
const host = process.env.HOST || server.host;

module.exports = app.listen(port, host);

console.log(`Server run in port ${port} host ${host}`);