// // import Endpoints
const path = require('path');
const biblioteca = require('./api/biblioteca');
const localidad = require('./api/localidad');
const provincia = require('./api/provincia');
const populateEUS = require('./api/populateEUS');
const populateCAT = require('./api/populateCAT');
const populateCV = require('./api/populateCV');

const db = require(path.join(__dirname, './sqldb'));

module.exports = (app) => {
  app.use('/api/bibliotecas', biblioteca);
  app.use('/api/localidades', localidad);
  app.use('/api/provincias', provincia);
  app.use('/api/populateEUS', populateEUS);
  app.use('/api/populateCAT', populateCAT);
  app.use('/api/populateCV', populateCV);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });

  app.delete('/api/drop', async (req, res) => {
    try {
      console.log('BORRANDO');
      await db.sequelize.query(`
      delete from Biblioteca b; delete from Localidad l; delete from Provincia p;
      `);

      res.status(200).send('');
    } catch (error) {
      handleCatch(error);
    }
  });

  function handleCatch(error) {
    console.log('--------------------------------------------------------------------------');
    console.error(error);
    process.exit(1);
  }
};
