const path = require('path')
const development = require(path.join(__dirname, './environment/development')).sequelize;
const production = require(path.join(__dirname, './environment/production')).sequelize;

module.exports = {
  development: { ...development },
  test: {},
  production: { ...production },
};
