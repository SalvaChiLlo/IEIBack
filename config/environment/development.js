require('dotenv').config();

module.exports = {
  sequelize: {
    username: 'root',
    password: 'adminadmin',
    database: 'sequelize_database_development',
    host: 'omv.local',
    dialect: 'mysql',
    logging: console.log,
  },
  seedDB: false,
};
