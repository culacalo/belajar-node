require("module-alias/register");

const express = require("express");
const pino = require("express-pino-logger");
const bodyParser = require("body-parser");
const server = require("@config/server.js");
const routes = require("./routes");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to t1he database:", err);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(pino);

const port = process.env.SERVER_PORT || server.port;
const host = process.env.SERVER_HOST || server.host;

module.exports = app.listen(port, host);

console.log(`Server run in port ${port} host ${host}`);
