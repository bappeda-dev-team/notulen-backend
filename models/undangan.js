'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Undangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Undangan.belongsTo(models.Uuid, { foreignKey: 'uuid' });
    }
  }
  Undangan.init({
    uuid: DataTypes.STRING,
    nomor_surat: DataTypes.STRING,
    sifat: DataTypes.STRING,
    perihal: DataTypes.STRING,
    ditujukan: DataTypes.JSON,
    pendahuluan: DataTypes.STRING(10000),
    isi_undangan: DataTypes.STRING(10000),
    tanggal: DataTypes.JSON,
    waktu: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    acara: DataTypes.STRING,
    catatan: DataTypes.STRING(10000),
    penutup: DataTypes.STRING(10000),
    signature: DataTypes.STRING(10000),
    status: DataTypes.STRING,
    tanggal_surat: DataTypes.STRING,
    atasan: DataTypes.JSON,
    nip_atasan: DataTypes.STRING,
    lampiran: DataTypes.STRING(10000)
  }, {
    sequelize,
    modelName: 'Undangan',
  });
  return Undangan;
};