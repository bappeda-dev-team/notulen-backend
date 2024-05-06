'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.Uuid, { foreignKey: 'uuid' });
      Notification.belongsTo(models.Peserta, { foreignKey: 'id_peserta' });
      Notification.belongsTo(models.Notulen, { foreignKey: 'id_notulen' });
    }
  }
  Notification.init({
    uuid: DataTypes.STRING,
    id_peserta: DataTypes.INTEGER,
    nip_penanggungjawab_peserta: DataTypes.STRING,
    status_notification_peserta: DataTypes.STRING,
    id_notulen: DataTypes.INTEGER,
    nip_penanggungjawab_notulen: DataTypes.STRING,
    status_notification_notulen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};