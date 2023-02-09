const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provincia.hasMany(models.Localidad, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Provincia.init({
    codigoProvincia: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    nombreProvincia: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(255),
    },
  }, {
    sequelize,
    modelName: 'Provincia',
    freezeTableName: true,
  });
  return Provincia;
};
