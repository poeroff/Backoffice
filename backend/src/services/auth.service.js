import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PASSWORD_SALT_ROUNDS } from '../constants/security.constant.js';
import {prisma} from '../utiles/prisma/prisma.js';
import * as HttpStatus from '../errors/http-status.error.js';

export class AuthService {
    constructor() {
        //     this.membersRepository = new MembersRepository();
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
        const hashedPassword = bcrpyt.hashSync(password, PASSWORD_SALT_ROUNDS);

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
}
