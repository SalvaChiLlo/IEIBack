import { Router } from 'express';
import * as Biblioteca from './populateCV.controller';

const multer = require('multer');

const router = Router();

router.post('/', multer().single('fileKey'), Biblioteca.insert);

module.exports = router;
