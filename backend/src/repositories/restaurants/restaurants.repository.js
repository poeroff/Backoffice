import prisma from '../../utiles/prisma/prisma.js';

export default class RestaurantsRepository {
    /**
     * 음식점 등록
     * @param {Object} createObj
     */
    createdRestaurant = async (createObj) => {
        console.log(createObj.name, createObj.cate);
        await prisma.Restaurants.create({
            data: {
                memberId : createObj.memberId,

                name : createObj.name,
                description : createObj.description,
                image : createObj.image,
                cate : 0


               
            },
        });
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
    updateRestaurant = async (memberId, name, description, cate, image, id) => {
        const updatedRestaurant = await prisma.restaurants.update({
            where: { id: +id },
            data: {
                memberId,
                name,
                description,
                cate,
                image,
            },
        });
        console.log(updatedRestaurant);
        return updatedRestaurant;
    };
}
