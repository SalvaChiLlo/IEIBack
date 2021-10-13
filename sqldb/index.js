const Sequelize = require('sequelize');

const config = require('../config/environment');

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize),
};

// // Insert models below
db.Cliente = require('./Cliente')(db.sequelize, Sequelize.DataTypes);
db.Interes = require('./Interes')(db.sequelize, Sequelize.DataTypes);
db.CategoriaProducto = require('./Producto/CategoriaProducto')(db.sequelize, Sequelize.DataTypes);
db.Categoria = require('./Producto/Categoria')(db.sequelize, Sequelize.DataTypes);
db.Opinion = require('./Producto/Opinion')(db.sequelize, Sequelize.DataTypes);
db.Producto = require('./Producto/Producto')(db.sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
