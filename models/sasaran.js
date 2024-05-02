'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sasaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sasaran.belongsToMany(models.Uuid, {
        through: models.Sasaran_Uuid,
        foreignKey: 'id_sasaran',
        otherKey: 'id_uuid'
      });
    }
  }
  Sasaran.init({
    id_sasaran: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    sasaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sasaran',
  });
  return Sasaran;
};