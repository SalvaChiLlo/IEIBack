'use strict';
const path = require('path');
const { Biblioteca } = require(path.join(__dirname, '../../sqldb'));
const config = require(path.join(__dirname, '../../config/environment'));
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname, '../../sqldb'))

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return (err) => {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return (err) => {
    return res.status(statusCode).send(err);
  };
}

function handleCatch(error) {
  console.log('--------------------------------------------------------------------------')
  console.error(error)
  process.exit(1)
}

async function index(req, res) {
  try {
    console.log(req.query, 'PARAMS')
    const query = req.query;
    let bibliotecas = [];
    if (query.codigoLocalidad && query.codigoProvincia || query.codigoLocalidad) {
      bibliotecas = await Biblioteca.findAll({
        where: {
          LocalidadCodigoLocalidad: query.codigoLocalidad
        },
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })
    } else if (query.codigoProvincia) {
      bibliotecas = await Biblioteca.findAll({
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })

      bibliotecas = bibliotecas
        .filter(biblioteca => biblioteca.Localidad.Provincium.codigoProvincia === query.codigoProvincia)
    } else {
      bibliotecas = await Biblioteca.findAll({
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })
    }

    res.status(200).json(bibliotecas);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
function create(req, res) {
  const newBibl = Biblioteca.build(req.body);
  return newBibl.save()
    .then((biblioteca) => {
      Biblioteca.findAll({
        where: { id: biblioteca.id },
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      }).then(bibl => {
        res.json(bibl);
      })
    })
    .catch(validationError(res));
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  try {
    const id = req.params.id;
    const bibliotecas = await Biblioteca.findAll({
      where: {
        id
      },
      include: [
        {
          model: db.Localidad,
          include: {
            model: db.Provincia
          }
        }
      ]
    })
    res.status(200).json(bibliotecas);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
async function destroy(req, res) {
  try {
    const id = req.params.id;
    await Biblioteca.destroy({
      where: {
        id
      }
    })
    res.status(204).end();
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Change a users password
 */
function changePassword(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
  `);
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return Biblioteca.find({
    where: {
      id: userId,
    },
  })
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

module.exports = {
  index,
  show,
  create,
  destroy,
  changePassword,
};
