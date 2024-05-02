'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Uuids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'uuid tidak boleh kosong!'
          },
        }
      },
      kode_opd: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan OPD terkait!",
          },
        },
        references: {
          model: "Perangkat_Daerahs",
          key: "kode_opd",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nip_pegawai: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan pegawai terkait!",
          },
        },
        references: {
          model: "Pegawais",
          key: "nip",
        },
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
    await queryInterface.dropTable('Uuids');
  }
};