import { Router } from 'express';
import MenusController from '../controllers/menus/menus.controller.js';
import uploadMiddleware from '../middleware/upload.middleware.js';
import needSigninMiddleware from '../middleware/need-signin.middleware.js';

const router = Router();
const menusController = new MenusController();

/**
 * 메뉴 생성 API
 */
router.post(
    '/menus/:restaurantId',
    needSigninMiddleware,
    uploadMiddleware.single('file'),
    menusController.createMenu
);

/**
 * 메뉴 조회 API
 */
router.get('/menus/:restaurantId', menusController.getMenus);

/**
 * 메뉴 상세 조회 API
 */
router.get('/menu/:menuId', menusController.getMenu);

/**
 * 메뉴 수정 API
 */
router.patch(
    '/menu/:restaurantId/:menuId',
    needSigninMiddleware,
    uploadMiddleware.single('file'),
    menusController.updateMenu
);

/**
 * 메뉴 삭제 API
 */
router.delete(
    '/menu/:restaurantId/:menuId',
    needSigninMiddleware,
    menusController.deleteMenu
);

export default router;
