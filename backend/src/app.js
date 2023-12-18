import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import cors from "cors"


const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors())

app.use('/', router);
app.use(errorHandler);


app.listen(port,()=>{
    console.log("8000번 포트가 열렸습니다")
})

// const server =  app.listen(port)
// io.init(server);
// io.on("connection", socket =>{
//     console.log("Client connected")
// })


