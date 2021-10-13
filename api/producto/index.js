'use strict';

const { Router } = require('express');

const Producto = require('./producto.controller');

const router = new Router();

router.get('/', Producto.index);
router.post('/', Producto.create);
router.get('/:id', Producto.show);
router.delete('/:id', Producto.destroy);

module.exports = router;
