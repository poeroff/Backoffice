import prisma from '../../utiles/prisma/prisma.js';

export default class OrdersRepository {
    /**
     * 음식점 주문 현황 조회 (사장님)
     * @param {*} restaurantId
     */
    getOrders = async restaurantId => {
        try {
            const getOrders = await prisma.orders.findMany({
                where: {
                    restaurantId: +restaurantId,
                },
                include: {
                    member: {
                        select: {
                            id: true,
                            nickname: true,
                        },
                    },
                    restaurant: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    menu: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            });

            return getOrders;
        } catch (err) {
            console.log(err, '오류발생!!');
        }
    };

    /**
     * 음식 주문 조회 (사용자)
     */
    getUserOrders = async memberId => {
        try {
            const getOrders = await prisma.orders.findMany({
                where: {
                    memberId: +memberId,
                },
                include: {
                    member: {
                        select: {
                            id: true,
                            nickname: true,
                        },
                    },
                    restaurant: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    menu: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            });

            return getOrders;
        } catch (err) {
            console.log(err, '오류발생!!');
        }
    };


    /**트랜잭션으로 계좌 변경 작성 필요 */
    createOrder = async (newOrderObj, ownerId) => {
        try {
            const createdOrder = await prisma.orders.create({
                data: {
                    ...newOrderObj,
                },
            });

            await prisma.$transaction(async (tx) => {
                await tx.members.update({
                    where: { id: newOrderObj.memberId },
                    data: {
                        money: {
                            decrement: price
                        }
                    },
                });

                await tx.members.update({
                    where: { id: ownerId },
                    data: {
                        money: {
                            increment: price
                        }
                    }
                })
            });

            return createdOrder;
        } catch (err) {
            console.log(err, '오류발생!!');
        } finally {
            await prisma.$disconnect();
        }
    }

    getOrderAllInfo = async id => {
        const selectOrder = await prisma.orders.findFirst({
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
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return selectRestaurant;
    };

    /**
     * 주문 완료 처리
     * @param {*} orderId
     */
    completeOrder = async orderId => {
        const completeOrder = await prisma.orders.update({
            where: {
                id: +orderId,
            },
            data: {
                state: 'COMPLETED',
            },
        });

        return completeOrder;
    };

}
