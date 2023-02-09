const { LoremIpsum } = require('lorem-ipsum');
const { Biblioteca } = require('./sqldb');
const { Localidad } = require('./sqldb');
const { Provincia } = require('./sqldb');

const CANTIDAD_PROVINCIA = 5;
const CANTIDAD_LOCALIDAD = 40;

const localidades = generateLocalidades();
const provincias = generateProvincias();
const bibliotecas = generateBibliotecas();

Provincia.destroy({ where: {} })
  .then(() => Provincia.bulkCreate(
    provincias,
  )
    .then(() => {
      console.log('finished populating Provincia');
      Localidad.destroy({ where: {} })
        .then(() => Localidad.bulkCreate(
          localidades,
        )
          .then(() => {
            console.log('finished populating Localidades');
            Biblioteca.destroy({ where: {} })
              .then(() => Biblioteca.bulkCreate(
                bibliotecas,
              )
                .then(() => console.log('finished populating Bibliotecas'))
                .catch((err) => console.log('error populating Bibliotecas', err)));
          })
          .catch((err) => console.log('error populating localidades', err)));
    })
    .catch((err) => console.log('error populating provincias', err)));

function generateBibliotecas() {
  return Array(2000).fill(1).map((biblioteca, index) => ({
    nombre: 'qpqpq',
    tipo: 'qpqpq',
    direccion: 'qpqpq',
    codigoPostal: 'qpqpq',
    longitud: 'qpqpq',
    latitud: 'qpqpq',
    telefono: 'qpqpq',
    email: 'qpqpq',
    descripcion: 'qpqpq',
    LocalidadCodigoLocalidad: `CodigoLocalidad${Math.floor(Math.random() * CANTIDAD_LOCALIDAD)}`,
  }));
}

function generateLocalidades() {
  return Array(CANTIDAD_LOCALIDAD).fill(1).map((localidad, index) => ({
    codigoLocalidad: `CodigoLocalidad${index}`,
    nombreLocalidad: `NombreLocalidad${index}`,
    ProvinciumCodigoProvincia: `CodigoProvincia${Math.floor(Math.random() * CANTIDAD_PROVINCIA)}`,
  }));
}

function generateProvincias() {
  return Array(CANTIDAD_PROVINCIA).fill(1).map((provincia, index) => ({
    codigoProvincia: `CodigoProvincia${index}`,
    nombreProvincia: `NombreProvincia${index}`,
  }));
}
