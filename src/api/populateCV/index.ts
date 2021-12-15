'use strict';
import { Router } from 'express';
import * as Biblioteca from './populateCV.controller';

const router = Router();

router.get('/', Biblioteca.insert);

module.exports = router;
