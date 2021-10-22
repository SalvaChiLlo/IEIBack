'use strict';

const { Router } = require('express');

const Biblioteca = require('./biblioteca.controller');

const router = new Router();

router.get('/', Biblioteca.index);
router.post('/', Biblioteca.create);
router.get('/:id', Biblioteca.show);
router.delete('/:id', Biblioteca.destroy);

module.exports = router;
