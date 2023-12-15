import prisma from '../../utiles/prisma/prisma.js';

export default class MenusRepository {
    /**
     * 메뉴 등록
     */
    createMenu = async newMenuObj => {
        const createdMenu = await prisma.menus.create({
            data: {
                ...newMenuObj,
            },
        });

        return createdMenu;
    };

    /**
     * 메뉴 상세 조회 (해당 음식내 이름으로 검색)
     * @param {*} restaurantId
     * @param {*} name
     * @returns
     */
    selectOneMenu = async (restaurantId, name) => {
        const selectOneMenu = await prisma.menus.findFirst({
            where: {
                restaurantId: +restaurantId,
                name,
            },
        });

        return selectOneMenu;
    };

    /**
     * 메뉴 상세 조회 (음식id로 상세 조회)
     * @param {*} restaurantId
     * @param {*} name
     * @returns
     */
    getMenu = async menuId => {
        console.log(menuId);
        const selectOneMenu = await prisma.menus.findFirst({
            where: {
                id: +menuId,
            },
        });

        return selectOneMenu;
    };

    /**
     * 해당 음식점 모든 메뉴조회
     * @param {*} restaurantId
     * @returns
     */
    getMenus = async restaurantId => {
        const getMenus = await prisma.menus.findMany({
            where: {
                restaurantId: +restaurantId,
            },
        });

        return getMenus;
    };
}
