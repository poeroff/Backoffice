// let io;
// import socket from "socket.io"
// io = {
//     init : httpserver =>{
//         io = require("socket.io")(httpserver,{
//             cors: {
//                 origin: "http://localhost:3000", // 클라이언트의 주소에 맞게 설정
//                 methods: ["GET", "POST"]
//               }
//         });
//         return io;
//     },
//     getIo: () =>{
//         if(!io){
//             throw new Error("socket.io not initialized!");
//         }
//         return io

//     }
// }
// export default io;