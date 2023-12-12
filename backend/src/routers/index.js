import { Router } from 'express';
import restaurantsRouter from './restaurants.router.js';

const router = Router();

router.use('/', restaurantsRouter);

export default router;
