require('dotenv').config();

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let envFile = require('./development');

if (env === 'production') {
  envFile = require('./production');
}
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  ip: process.env.IP || '127.0.0.1',
  seedDB: true,
  secrets: {
    session: 'sequelize101-secret',
  },
  userRoles: ['guest', 'user', 'admin'],
};

module.exports = Object.assign(config, envFile || {});
