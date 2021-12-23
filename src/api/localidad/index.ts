'use strict';

import { Router } from 'express';
import * as Localidad from './localidad.controller';


const router = Router();

router.get('/', Localidad.index);
router.post('/', Localidad.create);
router.get('/:nombreLocalidad', Localidad.show);
router.delete('/:codigoLocalidad', Localidad.destroy);

module.exports = router;
