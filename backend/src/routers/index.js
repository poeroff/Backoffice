import { Router } from 'express';
import restaurantsRouter from './restaurants.router.js';

const router = Router();

router.use('/restaurants', restaurantsRouter);

export default router;
