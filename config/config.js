const development = require('./environment/development').sequelize;
const production = require('./environment/production').sequelize;

module.exports = {
  development: { ...development },
  test: {},
  production: { ...production },
};
