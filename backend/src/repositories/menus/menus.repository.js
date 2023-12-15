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
     * @param {*} menuId
     * @param {*} name
     * @returns
     */
    getMenu = async menuId => {
        console.log('메뉴 상세조회', menuId);
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

    /**
     * 메뉴 수정
     * @param {*} menuId
     * @param {*} updateMenuObj
     */
    updateMenu = async (menuId, updateMenuObj) => {
        const updatedMenu = await prisma.menus.update({
            where: {
                id: +menuId,
            },
            data: {
                ...updateMenuObj,
            },
        });

        return updatedMenu;
    };

    /**
     * 메뉴 삭제
     * @param {*} menuId
     */
    deleteMenu = async menuId => {
        const deletedMenu = await prisma.menus.delete({
            where: {
                id: +menuId,
            },
        });

        return deletedMenu;
    };
}
