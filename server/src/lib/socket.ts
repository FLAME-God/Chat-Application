import { Server } from "socket.io";
import http from "http";
import express,{Express} from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: [`${process.env.FRONTEND_URL}`]
    }
});

const userSocketMap: Record<string, string> = {};

export function getRecivedSoketId (reciverId:string){
    return userSocketMap[reciverId];
}

io.on("connection", (socket)=>{

    const userId = socket.handshake.query.userId as string;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};