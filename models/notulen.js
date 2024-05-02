'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notulen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notulen.belongsTo(models.Uuid, { foreignKey: 'uuid' });
      Notulen.belongsTo(models.Pegawai, { foreignKey: 'penanggungjawab' });
    }
  }
  Notulen.init({
    uuid: DataTypes.STRING,
    tanggal: DataTypes.JSON,
    waktu: DataTypes.STRING,
    pendahuluan: DataTypes.STRING(1234),
    pimpinan_rapat: DataTypes.STRING,
    peserta_rapat: DataTypes.JSON,
    isi_rapat: DataTypes.STRING(10000),
    tindak_lanjut: DataTypes.STRING(10000),
    lokasi: DataTypes.STRING,
    acara: DataTypes.STRING,
    atasan: DataTypes.JSON,
    status: DataTypes.STRING,
    tanggal_surat: DataTypes.STRING,
    link_img_foto: DataTypes.JSON,
    link_img_daftar_hadir: DataTypes.JSON,
    link_img_surat_undangan: DataTypes.JSON,
    link_img_spj: DataTypes.JSON,
    link_img_pendukung: DataTypes.JSON,
    signature: DataTypes.STRING(10000),
    signature_atasan: DataTypes.STRING(10000),
    keterangan: DataTypes.STRING,
    nip_atasan: DataTypes.STRING,
    penanggungjawab: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notulen',
  });
  return Notulen;
};