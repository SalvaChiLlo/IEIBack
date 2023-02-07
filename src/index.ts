const config = require('./config/environment');
const express = require('express');
const expressConfig = require('./config/express');
const http = require('http');
const fs = require('fs')
import path from "path";
const routeConfig = require(path.join(__dirname, './routes'));
const sqldb = require(path.join(__dirname, './sqldb'));
import { convertXMLToJSON } from '../../IEICAT/src/index';
import { convertCSVToJSON } from '../../IEICV/src/index';

async function parseData() {
  fs.writeFileSync('./CAT.json', JSON.stringify(convertXMLToJSON(fs.readFileSync(path.join(__dirname, './biblioteques.xml')).toString())))
  fs.writeFileSync('./VAL.json', JSON.stringify(await convertCSVToJSON(fs.readFileSync(path.join(__dirname, './biblioteques.csv')).toString())))
}

// parseData()

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
sqldb.sequelize.sync({ force: true })
  .then(startServer)
  .catch((err: Error) => {
    console.error(`Server failed to start due to error: ${err}`);
  });

module.exports = app;