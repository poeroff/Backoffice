import prisma from '../../utiles/prisma/prisma.js';

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
}
