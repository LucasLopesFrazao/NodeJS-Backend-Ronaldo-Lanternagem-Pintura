const { Sequelize } = require("sequelize");
const database = require("../config/db");
const Carros = require("./carros");

const TermoQuitacao = database.define("termoQuitacoes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  carroId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'carros', // nome do modelo
      key: 'id', // nome da coluna
    },
  },
  seguradora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sinistro: {
    type: Sequelize.STRING,
  },
  orcamento: {
    type: Sequelize.STRING,
  },
  apolice: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.DATE,
  },
  valorTotal: {
    type: Sequelize.FLOAT.UNSIGNED,
    allowNull: false,
  },
  MaoObra: {
    type: Sequelize.FLOAT.UNSIGNED,
    allowNull: false,
  },
  Peca: {
    type: Sequelize.FLOAT.UNSIGNED,
  },
  Franquia: {
    type: Sequelize.FLOAT.UNSIGNED,
  },
  obs: {
    type: Sequelize.TEXT,
  }
});

TermoQuitacao.belongsTo(Carros, { foreignKey: 'carroId' }); // um carro pertence a um único cliente
Carros.hasMany(TermoQuitacao, { foreignKey: 'carroId' }); // um cliente possui vários carros

module.exports = TermoQuitacao;