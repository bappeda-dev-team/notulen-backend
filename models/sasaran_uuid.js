'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sasaran_Uuid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sasaran_Uuid.init({
    id_uuid: DataTypes.STRING,
    id_sasaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sasaran_Uuid',
  });
  return Sasaran_Uuid;
};