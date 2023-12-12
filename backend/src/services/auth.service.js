import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utiles/prisma/prisma.js';

export class AuthService {
    signup = async ({ email, nickname, password, ownerYn }) => {
        // 동일 email 확인
        const isExistMember = await prisma.email.findFirst({
            where: { email },
        });
        if (isExistMember) {
            return res
                .status(409)
                .json({ message: '이미 가입 된 이메일 입니다.' });
        }

        // Members 테이블에 email, password를 이용하여 사용자 생성
        const hashedPassword = await bcrpyt.hash(password, 10);

        const newMember = await this.membersRepository.createOne({
            email,
            password: hashedPassword,
            nickname,
            ownerYn,
        });

        return newMember;
    };
}
