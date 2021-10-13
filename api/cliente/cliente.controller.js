'use strict';

const { Cliente, Categoria, Opinion } = require('../../sqldb');
const config = require('../../config/environment');
const jwt = require('jsonwebtoken');
const { response } = require('../..');

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

async function getData(input) {
  return await input.map(item => item.get())
}

async function index(req, res) {
  try {
    const productos = await Cliente.findAll({
      order: [['id', 'ASC']]
    })

    const promises = productos.map(async (product) => {
      console.log(product)
      const productData = product.get();
      const opiniones = (await product.getOpinions());
      const categorias = (await product.getCategorias());
      productData.opiniones = await getData(opiniones)
      productData.categorias = await getData(categorias)
      return productData
    })

    const response = await Promise.all(promises)

    res.status(200).json(response);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
function create(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
`);
  const newUser = Cliente.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  return newUser.save()
    .then((user) => {
      const token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5,
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single product
 */
async function show(req, res, next) {
  let { id } = req.params;
  try {
    let cliente = await Cliente.findAll({ where: { id } })
    res.json(cliente);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
  `);
  return Cliente.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(204).end();
    })
    .catch(handleError(res));
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

  return Cliente.find({
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
