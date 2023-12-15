import express from 'express';
import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../utiles/prisma/prisma.js';

const router = express.Router();

// 회원가입 /auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { email, password, passwordCheck,  nickname,  ownerYn } = req.body;
       
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

        let emailValidationRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
       

        const isValidEmail = emailValidationRegex.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                success: false,
                message: '올바른 이메일 형식이 아닙니다.',
            });
        }

        // 동일 email 확인
        const isExistMember = await prisma.users.findFirst({
            where: { email },
        });
        if (isExistMember) {
            return res
                .status(409)
                .json({ message: '이미 가입 된 이메일 입니다.' });
        }

        // Members 테이블에 email, password를 이용하여 사용자 생성
        const hashedPassword = await bcrpyt.hash(password, 10);

        const newMember = await prisma.Members.create({
            data: {
                email,
                password: hashedPassword,
                nickname,
                ownerYn,
                createdAt,
                updatedAt,
            },
        });

        return res.status(201).json({
            success: true,
            message: '회원가입에 성공했습니다.',
            data: newMember,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:
                '예상치 못한 에러가 발생하였습니다. 관리자에게 문의 하세요.',
        });
    }
});

// 로그인
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const member = await prisma.Members.findFirst({ where: { email } });
    // email 일치 여부
    if (!member) {
        return res.status(401).json({ message: '이메일 일치하지 않습니다.' });
    }
    // password를 bcrypt로 검증
    const result = bcrpyt.compare(
        password,
        prisma.Members.findFirst({ where: { password } })
    );
    if (!result) {
        return res
            .status(401)
            .json({ message: '비밀번호가 일치하지 않습니다.' });
    }
    // 로그인 성공시, JWT 발급
    const token = jwt.sign(
        {
            id: prisma.Members.id,
        },
        'customized_secret_key'
    );

    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({ message: '로그인에 성공했습니다.' });
});

router.get('');

export default router;
