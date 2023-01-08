'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('carros', 'clienteId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'clientes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // excluir carros quando o cliente for excluído
    });
    await queryInterface.addColumn('clientes', 'carroId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'carros',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('carros', 'clienteId');
    await queryInterface.removeColumn('clientes', 'carroId');
  }
};
