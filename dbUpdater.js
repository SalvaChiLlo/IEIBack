const sqldb = require('./sqldb');

sqldb.sequelize.sync({ force: true })
  .catch((err) => {
    console.error(`Server failed to start due to error: ${err}`);
  });
