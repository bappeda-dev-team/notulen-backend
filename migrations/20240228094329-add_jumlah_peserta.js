'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Undangans', 'jumlah_peserta', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Undangans', 'jenis_peserta', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Undangans', 'jumlah_peserta', { transaction: t }),
        queryInterface.removeColumn('Undangans', 'jenis_peserta', { transaction: t })
      ]);
    });
  }
};
