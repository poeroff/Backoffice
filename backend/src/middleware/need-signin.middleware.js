import jwt from 'jsonwebtoken';
import {
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.constant.js';

export default async function (req, res, next) {
    try {
        //클라이언트에서 쿠키 전달
        const { authorization } = req.headers;
        

        //쿠키가 Bearer 형식인지 확인
        const [tokenType, token] = authorization.split(' ');
        
        if (tokenType !== 'Bearer')
            throw new Error('토큰 타입이 일치하지 않습니다.');

        //서버 발급 JWT 검증
        
        const decodedToken = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
       
        res.locals.user = decodedToken.memberId;
        next();
    } catch (error) {
        res.clearCookie('authorization');

        switch (error.name) {
            case 'TokenExpiredError':
                return res
                    .status(401)
                    .json({ message: '토큰이 만료되었습니다.' });
            case 'JsonWebTokenError':
                return res
                    .status(401)
                    .json({ message: '토큰 인증에 실패하였습니다.' });
            default:
                return res.status(401).json({
                    message: error.message ?? '비 정상적인 요청입니다.',
                });
        }
    }
}
