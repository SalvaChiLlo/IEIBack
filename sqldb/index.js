const Sequelize = require('sequelize');

const config = require('../config/environment');

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize),
};

// // Insert models below
db.Biblioteca = require('./Biblioteca')(db.sequelize, Sequelize.DataTypes);
db.Localidad = require('./Localidad')(db.sequelize, Sequelize.DataTypes);
db.Provincia = require('./Provincia')(db.sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
