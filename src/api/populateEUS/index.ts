'use strict';
import { Router } from 'express';
import * as Biblioteca from './populateEUS.controller';

const router = Router();

router.post('/', Biblioteca.index);

module.exports = router;
