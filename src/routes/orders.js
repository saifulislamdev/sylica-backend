import { Router } from 'express';
import createOrder from './controllers/ordersController/createOrder';
import authenticateToken from '../routes/middlewares/authenticateToken';

const router = Router();

router.post('/create-order', createOrder);
export default router;
