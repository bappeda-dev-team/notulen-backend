'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagging_Uuid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tagging_Uuid.init({
    id_uuid: DataTypes.STRING,
    id_tagging: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tagging_Uuid',
  });
  return Tagging_Uuid;
};