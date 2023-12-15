import RestaurantsRepository from '../../repositories/restaurants/restaurants.repository.js';
import OrdersRepository from '../../repositories/orders/orders.repository.js';
import { Exception } from '../../utiles/exception/Exception.js';
import { Success } from '../../utiles/success/success.js';

export default class OrdersService {
    restaurantsRepository = new RestaurantsRepository();
    ordersRepository = new OrdersRepository();

    /**
     * 주문 내역 조회
     * @param {*} memberId
     * @param {*} params
     */
    getOrders = async (memberId, params) => {
        const { restaurantId } = params;

        //1. 현재 사용자가 이 가게 사장님인지 체크 해야함
        const selectRestaurant =
            await this.restaurantsRepository.getRestaurantAllInfo(restaurantId);

        if (!selectRestaurant) {
            throw new Exception(400, '존재하지 않는 음식점 입니다.');
        }

        if (selectRestaurant.memberId !== memberId) {
            throw new Exception(
                400,
                '주문 확인은 해당 가게 사장님만 가능합니다.'
            );
        }

        try {
            const getOrders = await this.ordersRepository.getOrders(
                restaurantId
            );

            return new Success(200, '주문 조회가 완료 되었습니다', getOrders);
        } catch (err) {
            return new Exception(500, err);
        }
    };

    /**
     * 주문 내역 확인 (사용자)
     * @param {*} req
     * @param {*} res
     */
    getUserOrders = async memberId => {
        try {
            const getOrders = await this.ordersRepository.getUserOrders(
                memberId
            );

            return new Success(200, '주문 조회가 완료 되었습니다', getOrders);
        } catch (err) {
            return new Exception(500, err);
        }
    };

    /**
     * 주문 완료 처리
     * @param {*} memberId
     * @param {*} params
     */
    completeOrder = async (memberId, params) => {
        const { orderId, restaurantId } = params;

        //1. 현재 사용자가 해당 가게 사장님인지 검사
        const selectRestaurant =
            await this.restaurantsRepository.getRestaurantAllInfo(restaurantId);

        if (!selectRestaurant) {
            throw new Exception(400, '존재하지 않는 음식점 입니다.');
        }

        if (selectRestaurant.memberId !== memberId) {
            throw new Exception(
                400,
                '주문 완료 처리는 해당 가게 사장님만 가능합니다.'
            );
        }

        const completeOrder = await this.ordersRepository.completeOrder(
            orderId
        );

        return new Success(200, '배달 완료 처리 되었습니다.', completeOrder);
    };
}
