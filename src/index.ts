import path from 'path';

const express = require('express');
const http = require('http');
const expressConfig = require('./config/express');
const config = require('./config/environment');

const routeConfig = require(path.join(__dirname, './routes'));
const sqldb = require(path.join(__dirname, './sqldb'));

// Setup server
const app = express();
const server = http.createServer(app);
expressConfig(app);
routeConfig(app);

function startServer() {
  server.listen(config.port, config.ip, () => {
    console.log(`Server is listening on http://${config.ip}:${config.port}, in ${app.get('env')} mode`);
  });
}

// sqldb.sequelize.sync()
sqldb.sequelize.sync({ alter: true })
  .then(startServer)
  .catch((err: Error) => {
    console.error(`Server failed to start due to error: ${err}`);
  });

module.exports = app;
