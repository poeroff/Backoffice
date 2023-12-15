import { Router } from 'express';
import RestaurantsController from '../controllers/restaurants/restaurants.controller.js';
import uploadMiddleware from '../middleware/upload.middleware.js';
import needSigninMiddleware from '../middleware/need-signin.middleware.js';

const router = Router();
const restaurantsController = new RestaurantsController();

/**
 * 음식점 등록 API
 */
router.post(
    '/restaurants',
    needSigninMiddleware,
    uploadMiddleware.single('file'),
    restaurantsController.createRestaurant
);

/**
 * 음식점 목록 조회 API
 */
router.get('/restaurants/:cate', restaurantsController.getRestaurants);

/**
 * 음식점 상세 조회 API
 */
router.get(
    '/restaurants/:cate/:restaurantId',
    restaurantsController.getRestaurant
);

/**
 * 음식점 정보 수정 API
 */
router.put(
    '/restaurants/:cate/:restaurantId',
    needSigninMiddleware,
    uploadMiddleware.single('file'),
    restaurantsController.updateRestaurant
);

/**
 * 음식점 삭제 API
 */
router.delete(
    '/restaurants/:cate/:restaurantId',
    needSigninMiddleware,
    restaurantsController.deleteRestaurant
);
export default router;
