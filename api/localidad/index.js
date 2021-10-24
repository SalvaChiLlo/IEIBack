'use strict';

const { Router } = require('express');
const path = require('path')
const Localidad = require(path.join(__dirname, './localidad.controller'));

const router = new Router();

router.get('/', Localidad.index);
router.post('/', Localidad.create);
router.get('/:codigoLocalidad', Localidad.show);
router.delete('/:codigoLocalidad', Localidad.destroy);

module.exports = router;
