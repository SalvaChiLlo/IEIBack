// // import Endpoints
const biblioteca = require('./api/biblioteca');
const localidad = require('./api/localidad');
const provincia = require('./api/provincia');

module.exports = (app) => {
  app.use('/api/bibliotecas', biblioteca);
  app.use('/api/localidades', localidad);
  app.use('/api/provincias', provincia);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
