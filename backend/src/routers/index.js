import { Router } from 'express';
import restaurantsRouter from './restaurants.router.js';
import authRouter from './auth.router.js';
import menusRouter from './meuns.router.js';

const router = Router();

router.use('/', restaurantsRouter);
router.use('/', authRouter);
router.use('/', menusRouter);

export default router;
