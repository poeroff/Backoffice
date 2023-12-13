import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    PASSWORD_SALT_ROUNDS,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.constant.js';
import prisma from '../utiles/prisma/prisma.js';
import * as HttpStatus from '../errors/http-status.error.js';
// import { MembersRepository } from '../repositories/members.repository.js';

export class AuthService {
    constructor() {
        // this.membersRepository = new MembersRepository();
    }

    signup = async ({ email, nickname, password, ownerYn }) => {
        // 동일 email 확인
        const isExistMember = await prisma.members.findFirst({
            where: { email },
        });
        if (isExistMember) {
            throw new HttpStatus.BadRequest('이미 가입 된 이메일 입니다.');
        }

        // Members 테이블에 email, password를 이용하여 사용자 생성
        const hashedPassword = bcrypt.hashSync(password, PASSWORD_SALT_ROUNDS);

        const newMember = await prisma.members.create({
            data: {
                email,
                password: hashedPassword,
                nickname,
                ownerYn,
                money: ownerYn === 'USER' ? 1000000 : 0,
            },
        });

        delete newMember.password;

        return newMember;
    };

    signin = async ({ email, password }) => {
        
        const member = await prisma.members.findFirst({
            where: { email },
        });
        const hashedPassword = member.password;
        const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

        const isCorrectMember = member && isPasswordMatched;

        // 일치 여부
        if (!isCorrectMember) {
            return res
                .status(401)
                .json({ message: '일치하는 인증 정보가 없습니다.' });
        }

        // 로그인 성공시, JWT 발급
        const accessToken = jwt.sign(
            { memberId: member.id },
            JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
            }
        );

        return accessToken;
    };
}
