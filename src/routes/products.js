import { Router } from 'express';

import authenticateToken from './middlewares/authenticateToken';
import createProduct from './controllers/productsControllers/createProduct';
import uploadProductImages from './middlewares/uploadProductImages';
import getProducts from './controllers/productsControllers/getProducts';
import getProductByID from './controllers/productsControllers/getProductByID';
import getProductsByCategory from './controllers/productsControllers/getProductsByCategory';
import getProductsByUser from './controllers/productsControllers/getProductsByUser';
import getProductImage from './controllers/productsControllers/getProductImage';
import patchUpdateQuantity from './controllers/productsControllers/patchUpdateQuantity';
import deleteProductByID from './controllers/productsControllers/deleteProductByID';
const router = Router();

router.post(
  '/',
  authenticateToken,
  uploadProductImages.array('images'),
  createProduct
);
router.get('/getProducts', getProducts);
router.get('/:productID', getProductByID);
router.get('/', getProductsByCategory);
router.get('/active-listings/:userId', getProductsByUser);
router.get('/images/:filename', getProductImage);
router.patch('/:productID', authenticateToken, patchUpdateQuantity);
router.delete('/:productID', authenticateToken, deleteProductByID);

export default router;
