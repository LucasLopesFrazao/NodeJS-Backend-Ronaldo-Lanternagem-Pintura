const { Sequelize } = require("sequelize");
const database = require("../config/db");
const Cliente = require("./clientes");

const Carros = database.define("carro", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  clienteId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'clientes', // nome do modelo
      key: 'id', // nome da coluna
    },
  },
  marca: {
    type: Sequelize.STRING,
  },
  modelo: {
    type: Sequelize.STRING,
  },
  cor: {
    type: Sequelize.STRING,
  },
  ano: {
    type: Sequelize.STRING,
  },
  placa: {
    type: Sequelize.STRING,
  },
  chassi: {
    type: Sequelize.STRING,
  },
});

Carros.belongsTo(Cliente, { foreignKey: 'clienteId' }); // um carro pertence a um único cliente
Cliente.hasMany(Carros, { foreignKey: 'clienteId' }); // um cliente possui vários carros

module.exports = Carros;