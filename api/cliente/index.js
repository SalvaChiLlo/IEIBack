'use strict';

const { Router } = require('express');

const Cliente = require('./cliente.controller');

const router = new Router();

router.get('/', Cliente.index);
router.post('/', Cliente.create);
router.get('/:id', Cliente.show);
router.delete('/:id', Cliente.destroy);

module.exports = router;
