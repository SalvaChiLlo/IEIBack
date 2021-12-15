'use strict';
import { Router } from 'express';
import * as Biblioteca from './populateCAT.controller';

const router = Router();

router.get('/', Biblioteca.insert);

module.exports = router;
