import { Router } from 'express';

import createProduct from './controllers/productsControllers/createProduct';

const router = Router();

router.post('/', createProduct);

export default router;
