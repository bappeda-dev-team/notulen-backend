'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Perangkat_Daerahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      kode_opd: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Kode OPD tidak boleh kosong!'
          },
        }
      },
      nama_opd: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama OPD tidak boleh kosong!'
          }
        }
      },
      singkatan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      faximile: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Perangkat_Daerahs');
  }
};