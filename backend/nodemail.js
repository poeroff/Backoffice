import nodemailer from 'nodemailer';
import 'dotenv/config';

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        password: process.env.NODEMAILER_PASS,
    },
});

function randomAuthNumber() {
    // 6자리 랜덤 숫자
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // 숫자를 문자열로 변환하여 반환
    return randomNumber.toString();
}

const authNumber = randomAuthNumber();

let details = {
    from: '',
    to: '',
    subject: '배달의 신, 가입 인증번호입니다.',
    text: `인증번호는 ${authNumber} 입니다.`,
};

mailTransporter.sendMail(details, err => {
    if (err) {
        console.log('메일 전송에 실패하였습니다.', err);
    } else {
        console.log('인증 메일을 보냈습니다.');
    }
});
