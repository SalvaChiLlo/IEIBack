require('dotenv').config();

module.exports = {
  sequelize: {
    username: 'ymemqqbelumkfo',
    password: '9fdbe8d2e45f3cfa51555ef524150d205b67c1247266829b05cd626b4da8be85',
    database: 'd7v59pbqs3ddap',
    host: 'ec2-54-195-195-81.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    logging: console.log,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

  },
  seedDB: false,
};
