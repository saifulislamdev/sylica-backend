import { Router } from 'express';

import createProduct from './controllers/productsControllers/createProduct';
import getProducts from './controllers/productsControllers/getProducts';
import getProductByID from './controllers/productsControllers/getProductByID';
import getProductsByCategory from './controllers/productsControllers/getProductsByCategory';

const router = Router();

router.post('/', createProduct);
router.get('/getProducts', getProducts);
router.get('/:productID', getProductByID);
router.get('/', getProductsByCategory);

export default router;
