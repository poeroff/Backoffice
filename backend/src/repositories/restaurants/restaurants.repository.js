import { Exception } from '../../utiles/exception/Exception.js';
import prisma from '../../utiles/prisma/prisma.js';

export default class RestaurantsRepository {
    /**
     * 음식점 등록
     * @param {Object} createObj
     */
    createdRestaurant = async createObj => {
        try {
            await prisma.restaurants.create({
                data: {
                    ...createObj,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * 음식점 조회
     * @param {String} memberId
     */
    getRestaurant = async memberId => {
        const selectRestaurant = await prisma.restaurants.findFirst({
            where: {
                memberId: +memberId,
            },
        });

        return selectRestaurant;
    };

    /**
     * 음식점 목록 조회
     * @param {*} cate
     * @param {*} searchParam
     * @returns
     */
    getRestaurants = async (cate, searchParam) => {
        const selectAllRestaurants = await prisma.restaurants.findMany({
            where: {
                cate,
                name: {
                    contains: searchParam,
                },
            },
            include: {
                member: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
            },
        });

        return selectAllRestaurants;
    };

    /**
     * 음식점 정보 상세 조회
     * @param {*} id
     * @returns
     */
    getRestaurantAllInfo = async id => {
        const selectRestaurant = await prisma.restaurants.findFirst({
            where: {
                id: +id,
            },
            include: {
                member: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
            },
        });

        return selectRestaurant;
    };

    /**
     * 음식점 정보 수정
     * @param {*} updateObj
     * @returns
     */
    updateRestaurant = async (updateObj, id) => {
        try {
            const updatedRestaurant = await prisma.restaurants.update({
                where: { id: +id },
                data: {
                    ...updateObj,
                },
            });
            console.log(updatedRestaurant);
            return updatedRestaurant;
        } catch (err) {
            console.log(err);
            throw new Exception().exceptionServer();
        }
    };

    /**
     * 음식점 삭제
     * @param {*} restaurantId
     */
    deleteRestaurant = async id => {
        try {
            const deletedRestaurant = await prisma.restaurants.delete({
                where: { id: +id },
            });

            return deletedRestaurant;
        } catch (err) {
            console.log(err);
            throw new Exception(500, '알수없는 에러');
        }
    };
}
