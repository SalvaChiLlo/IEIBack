'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.hasMany(models.Opinion);
      Producto.belongsToMany(models.CategoriaProducto, {
        through: models.Categoria,
        as: 'Categorias'
      })
    }
  };
  Producto.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    cantidadDisponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Math.random() * (200 - 100)) + 100
    },
    cantidadInicial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    caracteristicas: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    imagenes: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 1000.0
    },
  }, {
    sequelize,
    modelName: 'Producto',
    freezeTableName: true,
  });
  return Producto;
};
