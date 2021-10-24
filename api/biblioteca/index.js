'use strict';

const { Router } = require('express');
const path = require('path');
const Biblioteca = require(path.join(__dirname, './biblioteca.controller'));

const router = new Router();

router.get('/', Biblioteca.index);
router.post('/', Biblioteca.create);
router.get('/:id', Biblioteca.show);
router.delete('/:id', Biblioteca.destroy);

module.exports = router;
