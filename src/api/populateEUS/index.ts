'use strict';
import { Router } from 'express';
import * as Biblioteca from './populateEUS.controller';
const multer = require('multer')

const router = Router();

router.post('/',multer().single('fileKey'), Biblioteca.insert);

module.exports = router;
