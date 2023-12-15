import { Router } from 'express';
import needSigninMiddleware from '../middleware/need-signin.middleware.js';
import OrdersController from '../controllers/orders/order.controller.js';

const router = Router();
const ordersCountroller = new OrdersController();

/**
 * 주문 확인API (사장님)
 */
router.get(
    '/orders/:restaurantId',
    needSigninMiddleware,
    ordersCountroller.getOrders
);

/**
 * 주문 확인API (사용자)
 */
router.get('/orders', needSigninMiddleware, ordersCountroller.getUserOrders);

/**
 * 주문 완료 처리(사장님)
 */
router.patch(
    '/orders/:restaurantId/:orderId',
    needSigninMiddleware,
    ordersCountroller.completeOrder
);

export default router;
