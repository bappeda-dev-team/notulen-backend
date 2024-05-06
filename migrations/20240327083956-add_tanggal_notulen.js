'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Notulens',
      'tanggal_surat',
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Notulens',
      'tanggal_surat'
    );
  }
};
