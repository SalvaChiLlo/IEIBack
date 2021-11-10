// // import Endpoints
const biblioteca = require('./api/biblioteca');
const localidad = require('./api/localidad');
const provincia = require('./api/provincia');
const populateEUS = require('./api/populateEUS');
const populateCAT = require('./api/populateCAT');
const populateCV = require('./api/populateCV');

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
};
