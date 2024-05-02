"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Uuid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Uuid.hasOne(models.Undangan, { foreignKey: "uuid" });
      Uuid.hasMany(models.Peserta, { foreignKey: "uuid" });
      Uuid.hasMany(models.Notulen, { foreignKey: "uuid" });
      Uuid.belongsTo(models.Perangkat_Daerah, { foreignKey: "kode_opd" });
      Uuid.belongsTo(models.Pegawai, { foreignKey: "nip_pegawai" });
      Uuid.belongsToMany(models.Sasaran, {
        through: models.Sasaran_Uuid,
        foreignKey: "id_uuid",
        otherKey: "id_sasaran",
      });
      Uuid.belongsToMany(models.Tagging, {
        through: models.Tagging_Uuid,
        foreignKey: "id_uuid",
        otherKey: "id_tagging",
      });
    }
  }
  Uuid.init(
    {
      uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      kode_opd: DataTypes.STRING,
      nip_pegawai: DataTypes.STRING,
      bulan: DataTypes.STRING,
      tahun: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Uuid",
    },
  );
  return Uuid;
};
