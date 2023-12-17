import RestaurantsRepository from '../../repositories/restaurants/restaurants.repository.js';
import OrdersRepository from '../../repositories/orders/orders.repository.js';
import MembersRepository from '../../repositories/member/members.repository.js'
import { Exception } from '../../utiles/exception/exception.js';
import { Success } from '../../utiles/success/success.js';

export default class OrdersService {
    restaurantsRepository = new RestaurantsRepository();
    ordersRepository = new OrdersRepository();
    membersRepository = new MembersRepository();
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

    createOrder = async (memberId, params, bodyObj) => {
        try {
            const { restaurantId } = params;
            const { menuId } = bodyObj;

            const selectRestaurant =
                await this.restaurantsRepository.getRestaurantAllInfo(restaurantId);
            if (!selectRestaurant) {
                throw new Exception(400, '존재하지 않는 음식점 입니다.');
            }

            if (!menuId) {
                throw new Exception(400, '존재하지 않는 메뉴 입니다.')
            }

            const selectMemberMoney =
                await this.membersRepository.getMemberMoney(memberId);
            const menuPrice =
                await this.menusRepository.getMenuPrice(menuId);

            if (selectMemberMoney < menuPrice) {
                throw new Exception(
                    400,
                    '잔액이 부족합니다.'
                )
            }

            const newOrder = new Order(
                memberId,
                restaurantId,
                menuId
            );

            const createdOrder = await this.ordersRepository.createOrder(newOrder);

            return new Success(201, '주문이 생성되었습니다.', createdOrder);
        } catch (err) {
            return new Exception(500, err);
        }
    }

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
