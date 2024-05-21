'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
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
      id_peserta: {
        type: Sequelize.INTEGER,
        references: {
          model: "Peserta",
          key: "id"
        }
      },
      nip_penanggungjawab_peserta: {
        type: Sequelize.STRING,
      },
      status_notification_peserta: {
        type: Sequelize.STRING
      },
      id_notulen: {
        type: Sequelize.INTEGER,
        references: {
          model: "Notulens",
          key: "id"
        }
      },
      nip_penanggungjawab_notulen: {
        type: Sequelize.STRING
      },
      status_notification_notulen: {
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
    await queryInterface.dropTable('Peserta');
  }
};
