const Sequelize = require('sequelize');
const path = require('path')
const config = require(path.join(__dirname, '../config/environment'));

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize),
};

// // Insert models below
db.Biblioteca = require(path.join(__dirname, './Biblioteca'))(db.sequelize, Sequelize.DataTypes);
db.Localidad = require(path.join(__dirname, './Localidad'))(db.sequelize, Sequelize.DataTypes);
db.Provincia = require(path.join(__dirname, './Provincia'))(db.sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
