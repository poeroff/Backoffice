import MenusService from '../../services/menus/menus.service.js';

export default class MenusController {
    menusService = new MenusService();

    /**
     * 메뉴 등록 API
     * @param {*} req
     * @param {*} res
     */
    createMenu = async (req, res) => {
        const memberId = res.locals.user;
        console.log("hjeelo")
        try {
            const createdMenu = await this.menusService.createMenu(
                memberId,
                req.params,
                req.body,
                req.file
            );

            return res.status(createdMenu.status).json(createdMenu);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 음식점의 메뉴들을 모두 조회
     * @param {*} req
     * @param {*} res
     */
    getMenus = async (req, res) => {
        try {
            const getMenus = await this.menusService.getMenus(req.params);

            return res.status(getMenus.status).json(getMenus);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 메뉴 상세 조회
     * @param {*} req
     * @param {*} res
     */
    getMenu = async (req, res) => {
        try {
            const getMenu = await this.menusService.getMenu(req.params);

            return res.status(getMenu.status).json(getMenu);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 메뉴 수정
     */
    updateMenu = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const updatedMenu = await this.menusService.updateMenu(
                req.params,
                req.body,
                req.file,
                memberId
            );

            return res.status(updatedMenu.status).json(updatedMenu);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };

    /**
     * 메뉴 삭제
     */
    deleteMenu = async (req, res) => {
        const memberId = res.locals.user;
        try {
            const deletedMenu = await this.menusService.deleteMenu(
                req.params,
                memberId
            );

            return res.status(deletedMenu.status).json(deletedMenu);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    };
}
