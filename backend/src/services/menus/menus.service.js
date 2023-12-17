import RestaurantsRepository from '../../repositories/restaurants/restaurants.repository.js';
import MenusRepository from '../../repositories/menus/menus.repository.js';
import { Exception } from '../../utiles/exception/exception.js';
import { s3upload } from '../../utiles/function/s3.upload.js';
import { Success } from '../../utiles/success/success.js';

export default class MenusService {
    restaruantRepository = new RestaurantsRepository();
    menusRepository = new MenusRepository();

    /**
     * 메뉴 생성
     * @param {*} memberId
     * @param {*} params
     * @param {*} bodyObj
     * @param {*} file
     */
    createMenu = async (memberId, params, bodyObj, file) => {
        const { restaurantId } = params;
        const { name, description, price } = bodyObj;

        const selectRestaurant =
            await this.restaruantRepository.getRestaurantAllInfo(restaurantId);

        if (selectRestaurant.memberId !== memberId) {
            throw new Exception(
                400,
                '메뉴 등록은 해당 음식점 사장님만 가능합니다.'
            );
        }

        if (!name || !description || !file || !price) {
            throw new Exception(
                400,
                '메뉴 등록하는데 필요한 값이 입력되지 않았습니다.'
            );
        }

        const selectedMenu = await this.menusRepository.selectOneMenu(
            restaurantId,
            name
        );

        if (selectedMenu) {
            throw new Exception(
                400,
                '동일한 가게에 동일한 메뉴명이 존재합니다.'
            );
        }

        const resultImage = await s3upload(file);

        const newMenu = new Menu(
            restaurantId,
            name,
            price,
            description,
            resultImage.Location
        );

        const createdMenu = await this.menusRepository.createMenu(newMenu);

        return new Success(201, '메뉴가 생성되었습니다.', createdMenu);
    };

    /**
     * 해당 음식점 모든 메뉴 조회
     * @param {*} params
     */
    getMenus = async params => {
        const { restaurantId } = params;

        const getMenus = await this.menusRepository.getMenus(restaurantId);
        console.log('메뉴조회 성공', getMenus);
        return new Success(200, '메뉴 조회 성공', getMenus);
    };

    /**
     * 음식 상세 조회
     * @param {*} params
     */
    getMenu = async params => {
        const { menuId } = params;
        const getMenu = await this.menusRepository.getMenu(menuId);

        if (!getMenu) {
            throw new Exception(400, '잘못된 메뉴 입니다.');
        }

        return new Success(200, '메뉴 상세 조회 성공', getMenu);
    };

    /**
     * 메뉴 수정
     * @param {*} parmas
     * @param {*} body
     */
    updateMenu = async (params, body, file, memberId) => {
        const { menuId, restaurantId } = params;
        const { name, description, price } = body;

        // 1. 현재 사용자가 현재 가게 사장님인지 체크해야함
        const selectRestaurant =
            await this.restaruantRepository.getRestaurantAllInfo(restaurantId);

        if (selectRestaurant.memberId !== memberId) {
            throw new Exception(400, '해당 가게 사장님이 아닙니다.');
        }

        // 2. 수정사항이 있는지 체크해야함
        if (!name && !description && !price && !file) {
            throw new Exception(400, '수정 사항이 없습니다.');
        }

        // 3. 변경하려고 하는 메뉴의 이름이 해당가게에 이미 존재하는지 체크
        const getMenus = await this.menusRepository.getMenus(restaurantId);

        const filterMenus = getMenus.filter(obj => obj.name === name);

        if (filterMenus.length > 0) {
            throw new Exception(400, '중복된 메뉴이름이 있습니다.');
        }

        let resultImage;
        if (file) {
            resultImage = await s3upload(file).Location;
        }

        const prevMenu = await this.menusRepository.getMenu(menuId);

        const updateMenu = new Menu(
            restaurantId,
            name || prevMenu.name,
            price || prevMenu.price,
            description || prevMenu.description,
            resultImage || prevMenu.image
        );

        const updatedMenu = await this.menusRepository.updateMenu(
            menuId,
            updateMenu
        );

        return new Success(200, '메뉴 정보를 수정하였습니다.', updatedMenu);
    };

    deleteMenu = async (params, memberId) => {
        const { menuId, restaurantId } = params;
        //1. 해당 가게 사장님이 맞는지 체크
        const selectRestaurant = await this.restaruantRepository.getRestaurant(
            menuId
        );

        if (selectRestaurant.memberId !== memberId) {
            throw new Exception(400, '해당 가게 사장님이 아닙니다.');
        }

        //2. 메뉴 존재
        const selectMenu = await this.menusRepository.getMenu(menuId);

        if (!selectMenu) {
            throw new Exception(400, '해당 메뉴는 존재하지 않습니다.');
        }

        const deletedMenu = await this.menusRepository.deleteMenu(menuId);

        return new Success(200, '메뉴 삭제가 완료되었습니다.', deletedMenu);
    };
}

class Menu {
    constructor(restaurantId, name, price, description, image) {
        this.restaurantId = +restaurantId;
        this.name = name;
        this.price = +price;
        this.description = description;
        this.image = image;
    }
}
