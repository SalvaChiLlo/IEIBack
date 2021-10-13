'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriaProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // CategoriaProducto.belongsToMany(models.Producto, {
      //   through: models.Categoria
      // })
      CategoriaProducto.belongsToMany(models.Cliente, {
        through: models.Interes
      })
    }
  };
  CategoriaProducto.init({
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'CategoriaProducto',
    freezeTableName: true,
  });
  return CategoriaProducto;
};
