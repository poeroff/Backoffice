import { AuthService } from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import {
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_ACCESS_TOKEN_SECRET,
    PASSWORD_SALT_ROUNDS,
} from '../constants/security.constant.js';
import jwt from 'jsonwebtoken';

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signup = async (req, res, next) => {
        try {
            const { email, nickname, password, passwordCheck, ownerYn } =
                req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: '이메일 입력이 필요합니다.',
                });
            }

            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: '비밀번호 입력이 필요합니다.',
                });
            }

            if (!passwordCheck) {
                return res.status(400).json({
                    success: false,
                    message: '비밀번호 확인 입력이 필요합니다.',
                });
            }

            if (!nickname) {
                return res.status(400).json({
                    success: false,
                    message: '닉네임 입력이 필요합니다.',
                });
            }

            if (!ownerYn) {
                return res.status(400).json({
                    success: false,
                    message: '사용자의 정보 입력이 필요합니다.',
                });
            }

            if (password !== passwordCheck) {
                return res.status(400).json({
                    success: false,
                    message: '입력한 비밀번호가 서로 일치 하지 않습니다.',
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: '비밀번호는 최소 6자리 이상입니다.',
                });
            }

            let emailValidationRegex = new RegExp(
                '[a-z0-9._]+@[a-z]+\\.[a-z]{2,3}'
            );
            const isValidEmail = emailValidationRegex.test(email);
            if (!isValidEmail) {
                return res.status(400).json({
                    success: false,
                    message: '올바른 이메일 형식이 아닙니다.',
                });
            }

            const data = await this.authService.signup({
                email,
                nickname,
                password,
                ownerYn,
            });

            return res.status(201).json({
                success: true,
                message: '회원가입에 성공했습니다.',
                data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:
                    '예상치 못한 에러가 발생하였습니다. 관리자에게 문의 하세요.',
            });
        }
    };

    signin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: '이메일 입력이 필요합니다.',
                });
            }

            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: '비밀번호 입력이 필요합니다.',
                });
            }

            const accessToken = await this.authService.signin({
                email,
                password,
            });

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                data: { accessToken },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:
                    '예상치 못한 에러가 발생하였습니다. 관리자에게 문의 하세요.',
            });
        }
    };
}
