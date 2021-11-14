import { Router } from 'express';
import createOrder from './controllers/ordersController/createOrder';
import recentOrder from './controllers/ordersController/recentOrder';
import authenticateToken from './middlewares/authenticateToken';

const router = Router();

router.post('/create-order', authenticateToken, createOrder);
router.get('/recent-order', authenticateToken, recentOrder);
export default router;
