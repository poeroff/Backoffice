import nodemailer from 'nodemailer';
import 'dotenv/config';

// gmail_API 토큰 발급
const {
    OAUTH_USER,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REFRESH_TOKEN,
} = process.env;

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: OAUTH_USER,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
    },
});

function randomAuthNumber() {
    // 6자리 랜덤 숫자
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // 숫자를 문자열로 변환하여 반환
    return randomNumber.toString();
}

const authNumber = randomAuthNumber();

const message = {
    from: OAUTH_USER,
    to: ' * ', // * 수신자 메일 (DB 연동 필요)
    subject: '배달의 신, 가입 인증번호입니다.',
    text: `인증번호는 ${authNumber} 입니다.`,
};

mailTransporter.sendMail(message, err => {
    if (err) {
        console.log('메일 전송에 실패하였습니다.', err);
    } else {
        console.log('인증 메일을 보냈습니다.');
    }
});
