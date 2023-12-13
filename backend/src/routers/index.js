import { Router } from 'express';
import restaurantsRouter from './restaurants.router.js';
import authRouter from './auth.router.js';

const router = Router();

router.use('/', restaurantsRouter);
router.use('/', authRouter);

export default router;
