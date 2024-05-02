'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sasarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      id_sasaran: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Sasaran tidak boleh kosong!'
          },
        }
      },
      sasaran: {
        type: Sequelize.STRING
      },
      nama_pembuat: {
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
    await queryInterface.dropTable('Sasarans');
  }
};