import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/', router);

app.listen(port, () => {
    console.log(`서버가 정상적으로 구동되었습니다. ${port}`);
});
