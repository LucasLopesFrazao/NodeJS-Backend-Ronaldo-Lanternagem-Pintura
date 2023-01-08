const { Sequelize } = require("sequelize");
const database = require("../config/db");

const Cliente = database.define("cliente", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
  },
  cpf: {
    type: Sequelize.STRING,
  },
  rg: {
    type: Sequelize.STRING,
  },
});

module.exports = Cliente;
