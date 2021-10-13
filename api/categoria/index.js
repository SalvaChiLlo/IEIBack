'use strict';

const { Router } = require('express');

const Categoria = require('./categoria.controller');

const router = new Router();

router.get('/', Categoria.index);
router.post('/', Categoria.create);
router.get('/:id', Categoria.show);
router.delete('/:id', Categoria.destroy);

module.exports = router;
