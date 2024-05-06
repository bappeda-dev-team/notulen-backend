'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pegawai.hasMany(models.Uuid, { foreignKey: 'nip_pegawai' });
      Pegawai.belongsTo(models.Perangkat_Daerah, { foreignKey: 'kode_opd' });
    }
  }
  Pegawai.init({
    nama: DataTypes.STRING,
    nip: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    pangkat: DataTypes.STRING,
    nama_pangkat: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    eselon: DataTypes.STRING,
    role: DataTypes.STRING,
    kode_opd: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pegawai',
    hooks: {
      beforeCreate: (Pegawai, opt) => {
        Pegawai.password = hashPassword(Pegawai.password);
      }
    }
  });
  return Pegawai;
};