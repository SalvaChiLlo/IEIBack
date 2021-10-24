const path = require('path');
const sqldb = require(path.join(__dirname, './sqldb'));

sqldb.sequelize.sync({ force: true })
  .catch((err) => {
    console.error(`Server failed to start due to error: ${err}`);
  });
