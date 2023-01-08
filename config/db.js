require("dotenv").config();
const { Sequelize } = require("sequelize");

const ROOT = process.env.ROOT;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const sequelize = new Sequelize("users", ROOT, PASSWORD, {
  dialect: "mysql",
  host: HOST,
  port: PORT,
});

module.exports = sequelize;
