'use strict';

const { Router } = require('express');
const path = require('path')
const Provincia = require(path.join(__dirname, './provincia.controller'));

const router = new Router();

router.get('/', Provincia.index);
router.post('/', Provincia.create);
router.get('/:codigoProvincia', Provincia.show);
router.delete('/:codigoProvincia', Provincia.destroy);

module.exports = router;
