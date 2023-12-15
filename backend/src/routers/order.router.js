import { Router } from 'express';
import needSigninMiddleware from '../middleware/need-signin.middleware.js';
import OrdersController from '../controllers/orders/order.controller.js';

const router = Router();
const ordersCountroller = OrdersController();

/**
 * 주문 확인API
 */
router.get('/orders/:restaurantId', ordersCountroller.getOrders);

export default router;
