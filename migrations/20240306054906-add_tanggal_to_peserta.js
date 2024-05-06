'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Peserta',
      'tanggal',
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Peserta',
      'tanggal'
    );
  }
};
