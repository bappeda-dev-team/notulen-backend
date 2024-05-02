'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tagging.belongsTo(models.Perangkat_Daerah, { foreignKey: 'kode_opd' });
      Tagging.belongsToMany(models.Uuid, {
        through: models.Tagging_Uuid,
        foreignKey: 'id_tagging',
        otherKey: 'id_uuid'
      })
    }
  }
  Tagging.init({
    nama_tagging: DataTypes.STRING,
    kode_opd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tagging',
  });
  return Tagging;
};