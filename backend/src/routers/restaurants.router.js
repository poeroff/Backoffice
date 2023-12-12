import { Router } from 'express';
import { RestaurantsController } from '../controllers/restaurants/restaurants.controller.js';

const router = Router();
const restaurantsController = new RestaurantsController();

router.post('/restaurants', restaurantsController.createRestaurant);

export default router;
