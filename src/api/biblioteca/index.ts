'use strict';
import { Router } from 'express';
import * as Biblioteca from './biblioteca.controller';

const router = Router();

router.get('/', Biblioteca.index);
router.post('/', Biblioteca.create);
router.get('/:id', Biblioteca.show);
router.delete('/:id', Biblioteca.destroy);

module.exports = router;
