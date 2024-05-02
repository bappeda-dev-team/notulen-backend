"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notulens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      tanggal: {
        type: Sequelize.JSON,
      },
      waktu: {
        type: Sequelize.STRING,
      },
      pendahuluan: {
        type: Sequelize.STRING(1234),
      },
      pimpinan_rapat: {
        type: Sequelize.STRING,
      },
      peserta_rapat: {
        type: Sequelize.JSON,
      },
      isi_rapat: {
        type: Sequelize.STRING(10000),
      },
      tindak_lanjut: {
        type: Sequelize.STRING(10000),
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      acara: {
        type: Sequelize.STRING,
      },
      atasan: {
        type: Sequelize.JSON,
      },
      status: {
        type: Sequelize.STRING,
      },
      link_img_foto: {
        type: Sequelize.JSON,
      },
      link_img_daftar_hadir: {
        type: Sequelize.JSON,
      },
      link_img_surat_undangan: {
        type: Sequelize.JSON,
      },
      link_img_spj: {
        type: Sequelize.JSON,
      },
      link_img_pendukung: {
        type: Sequelize.JSON,
      },
      signature: {
        type: Sequelize.STRING(10000)
      },
      signature_atasan: {
        type: Sequelize.STRING(10000)
      },
      keterangan: {
        type: Sequelize.STRING,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notulens");
  },
};
