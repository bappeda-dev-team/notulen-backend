'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Undangans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan uuid!",
          },
        },
        references: {
          model: "Uuids",
          key: "uuid",
        },
      },
      nomor_surat: {
        type: Sequelize.STRING
      },
      sifat: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.STRING
      },
      ditujukan: {
        type: Sequelize.JSON,
      },
      pendahuluan: {
        type: Sequelize.STRING(10000)
      },
      isi_undangan: {
        type: Sequelize.STRING(10000)
      },
      tanggal: {
        type: Sequelize.JSON
      },
      waktu: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      acara: {
        type: Sequelize.STRING
      },
      penutup: {
        type: Sequelize.STRING(10000)
      },
      signature: {
        type: Sequelize.STRING(10000)
      },
      status: {
        type: Sequelize.STRING,
      },
      atasan: {
        type: Sequelize.JSON,
      },
      nip_atasan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan pegawai terkait!",
          },
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
    await queryInterface.dropTable('Undangans');
  }
};