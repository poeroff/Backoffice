import { Router } from 'express';
import { RestaurantsController } from '../controllers/restaurants/restaurants.controller.js';
import uploadMiddleware from '../middleware/upload.middleware.js';

const router = Router();
const restaurantsController = new RestaurantsController();

/**
 * 음식점 등록 API
 */
router.post(
    '/restaurants',
    uploadMiddleware.single('file'),
    restaurantsController.createRestaurant
);

export default router;
