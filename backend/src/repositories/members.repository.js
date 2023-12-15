import bcrypt from 'bcrypt';
import { PASSWORD_HASH_SALT_ROUNDS } from '../constants/security.constant.js';
import prisma from '../utiles/prisma/prisma.js';

export class MembersRepository {
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
