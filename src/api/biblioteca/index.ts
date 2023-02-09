import { Router } from 'express';
import * as Biblioteca from './biblioteca.controller';

const router = Router();

router.get('/', Biblioteca.index);
router.get('/cp', Biblioteca.indexPostalCodes);
router.get('/tipos', Biblioteca.indexTipos);
router.post('/', Biblioteca.create);
router.get('/:id', Biblioteca.show);
router.delete('/:id', Biblioteca.destroy);

module.exports = router;
