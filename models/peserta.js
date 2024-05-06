'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Peserta.hasOne(models.Notification, { foreignKey: 'id_peserta' });
      Peserta.belongsTo(models.Uuid, { foreignKey: 'uuid' });
    }
  }
  Peserta.init({
    uuid: DataTypes.STRING,
    jumlah_peserta: DataTypes.NUMBER,
    jenis_peserta: DataTypes.STRING,
    tanggal: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Peserta',
  });
  return Peserta;
};