import { Router } from 'express';

import createProduct from './controllers/productsControllers/createProduct';
import uploadProductImages from './middlewares/uploadProductImages';
import getProducts from './controllers/productsControllers/getProducts';
import getProductByID from './controllers/productsControllers/getProductByID';
import getProductsByCategory from './controllers/productsControllers/getProductsByCategory';

const router = Router();

router.post('/', uploadProductImages.array('images'), createProduct);
router.get('/getProducts', getProducts);
router.get('/:productID', getProductByID);
router.get('/', getProductsByCategory);

export default router;
