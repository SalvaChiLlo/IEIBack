'use strict';

const { Provincia } = require('../../sqldb');
const config = require('../../config/environment');
const jwt = require('jsonwebtoken');
const db = require('../../sqldb')

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
    let provincias = [];
    provincias = await Provincia.findAll({
      include: [
        {
          all: true
        }
      ]
    })

    res.status(200).json(provincias);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
function create(req, res) {
  const newProvincia = Provincia.build(req.body);
  return newProvincia.save()
    .then((provincia) => {
      Provincia.findAll({
        where: { codigoProvincia: provincia.codigoProvincia },
        include: [
          {
            all: true
          }
        ]
      }).then(prov => {
        res.json(prov);
      })
    })
    .catch(validationError(res));
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  try {
    const codigoProvincia = req.params.codigoProvincia;
    const provincias = await Provincia.findAll({
      where: {
        codigoProvincia
      },
      include: [
        {
          all: true
        }
      ]
    })
    res.status(200).json(provincias);
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
    const codigoProvincia = req.params.codigoProvincia;
    await Provincia.destroy({
      where: {
        codigoProvincia
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

  return Provincia.find({
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
