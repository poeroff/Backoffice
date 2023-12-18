import OrdersService from '../../services/orders/orders.service.js';

export default class OrdersController {
    ordersService = new OrdersService();

    /**
     * 주문 내역 조회 (사장님)
     * @param {*} req
     * @param {*} res
     */
    getOrders = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const getOrders = await this.ordersService.getOrders(
                memberId,
                req.params
            );

            return res.status(getOrders.status).json(getOrders);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 주문 내역 조회 (사용자)
     * @param {*} req
     * @param {*} res
     */
    getUserOrders = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const getOrders = await this.ordersService.getUserOrders(memberId);

            return res.status(getOrders.status).json(getOrders);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    createOrder = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const createOrder = await this.ordersService.createOrder(
                memberId,
                req.params,
                req.body
            );

            return res.status(createOrder.status).json(createOrder);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 주문 완료 처리
     * @param {*} req
     * @param {*} res
     */
    completeOrder = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const getOrders = await this.ordersService.completeOrder(
                memberId,
                req.params
            );

            return res.status(getOrders.status).json(getOrders);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };
}
