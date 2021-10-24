'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Localidad.hasMany(models.Biblioteca, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Localidad.belongsTo(models.Provincia, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Localidad.init({
    codigoLocalidad: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    nombreLocalidad: {
      type: DataTypes.TEXT,
      default: ''
    }
  }, {
    sequelize,
    modelName: 'Localidad',
    freezeTableName: true,
  });
  return Localidad;
};
