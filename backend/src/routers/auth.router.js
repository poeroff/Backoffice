import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();

// 회원가입
authRouter.post('/signup', authController.signup);

// 로그인
authRouter.post('/signin', authController.signin);

export default router;
