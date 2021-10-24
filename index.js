const config = require('./config/environment');
const express = require('express');
const expressConfig = require('./config/express');
const http = require('http');
const fs = require('fs')
const path = require('path');
const routeConfig = require(path.join(__dirname, './routes'));
const sqldb = require(path.join(__dirname, './sqldb'));
const cat = require(path.join(__dirname, '../IEICAT'));
const val = require(path.join(__dirname, '../IEICV'));

async function parseData() {
  fs.writeFileSync('./CAT.json', JSON.stringify(cat.convertXMLToJSON(fs.readFileSync(path.join(__dirname, './biblioteques.xml')).toString())))
  fs.writeFileSync('./VAL.json', JSON.stringify(await val.convertCSVToJSON(fs.readFileSync(path.join(__dirname, './biblioteques.csv')).toString())))
}

parseData()

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

sqldb.sequelize.sync()
  .then(startServer)
  .catch((err) => {
    console.error(`Server failed to start due to error: ${err}`);
  });

module.exports = app;