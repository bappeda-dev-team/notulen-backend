'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Undangans',
      'catatan',
      Sequelize.STRING(10000)
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Undangans',
      'catatan'
    );
  }
};
