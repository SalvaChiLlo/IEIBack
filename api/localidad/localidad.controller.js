'use strict';
const path = require('path')
const { Localidad } = require(path.join(__dirname, '../../sqldb'));
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
    let localidades = [];
    localidades = await Localidad.findAll({
      include: [
        {
          model: db.Provincia
        }
      ]
    })

    res.status(200).json(localidades);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
function create(req, res) {
  const newLocalidad = Localidad.build(req.body);
  return newLocalidad.save()
    .then((localidad) => {
      Localidad.findAll({
        where: { codigoLocalidad: localidad.codigoLocalidad },
        include: [
          {
            model: db.Provincia
          }
        ]
      }).then(local => {
        res.json(local);
      })
    })
    .catch(validationError(res));
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  try {
    const codigoLocalidad = req.params.codigoLocalidad;
    const bibliotecas = await Localidad.findAll({
      where: {
        codigoLocalidad
      },
      include: [
        {
          model: db.Provincia
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
    const codigoLocalidad = req.params.codigoLocalidad;
    await Localidad.destroy({
      where: {
        codigoLocalidad
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

  return Localidad.find({
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
