import prisma from '../../utiles/prisma/prisma.js';
import bcrypt from 'bcrypt';
import { PASSWORD_HASH_SALT_ROUNDS } from '../../constants/security.constant.js';

export default class MembersRepository {
    /**
     * 회원 정보 조회
     * @param {*} id
     * @returns
     */
    getMember = async id => {
        const selectMember = await prisma.members.findFirst({
            where: {
                id: +id,
            },
        });

        return selectMember;
    };

    createOne = async ({ email, password, nickname, ownerYn, money }) => {
        const hashedPassword = bcrypt.hashSync(
            password,
            PASSWORD_HASH_SALT_ROUNDS
        );

        const newMember = await prisma.members.create({
            data: {
                email,
                password: hashedPassword,
                nickname,
                ownerYn,
                money,
            },
        });

        delete newMember.password;

        return newMember;
    };

    readOneById = async id => {
        const member = await prisma.members.findUnique({ where: { id } });

        return member;
    };

    readOneByEmail = async email => {
        const member = await prisma.members.findUnique({ where: { email } });

        return member;
    };
}
