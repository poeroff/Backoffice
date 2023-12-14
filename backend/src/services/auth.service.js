import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.constant.js';
import * as HttpStatus from '../errors/http-status.error.js';
import { MembersRepository } from '../repositories/members.repository.js';

export class AuthService {
    constructor() {
        this.membersRepository = new MembersRepository();
    }

    signup = async ({ email, nickname, password, ownerYn }) => {
        // 동일 email 확인
        const isExistMember = await this.membersRepository.readOneByEmail(
            email
        );
        if (isExistMember) {
            throw new HttpStatus.BadRequest('이미 가입 된 이메일 입니다.');
        }

        // Members 테이블에 email, password를 이용하여 사용자 생성
        const money = ownerYn === 'USER' ? 1000000 : 0;
        const newMember = this.membersRepository.createOne({
            email,
            password,
            nickname,
            ownerYn,
            money,
        });

        return newMember;
    };

    signin = async ({ email, password, ownerYn }) => {
        const member = await this.membersRepository.readOneByEmail(email);

        if (ownerYn !== member.ownerYn) {
            throw new Error(`${ownerYn}이(가) 아닙니다.`);
        }

        const hashedPassword = member?.password ?? '';

        const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

        const isCorrectMember = member && isPasswordMatched;

        // 일치 여부
        if (!isCorrectMember) {
            throw new HttpStatus.Unauthorized('일치하는 인증 정보가 없습니다.');
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
