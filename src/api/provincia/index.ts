'use strict';

import { Router } from 'express';
import * as Provincia from './provincia.controller'

const router = Router();

router.get('/', Provincia.index);
router.post('/', Provincia.create);
router.get('/:codigoProvincia', Provincia.show);
router.delete('/:codigoProvincia', Provincia.destroy);

module.exports = router;
