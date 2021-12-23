'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biblioteca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Biblioteca.belongsTo(models.Localidad, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Biblioteca.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      primaryKey: true,
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
    tipo: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    direccion: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    codigoPostal: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    longitud: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    latitud: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    telefono: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    email: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    descripcion: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    web: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
  }, {
    sequelize,
    modelName: 'Biblioteca',
    freezeTableName: true,
  });
  return Biblioteca;
};
