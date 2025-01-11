import { Server } from "socket.io";
import http from "http";
import express,{Express} from "express";

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000"]
    }
});

const userSocketMap: Record<string, string> = {};

export function getRecivedSoketId (reciverId:string){
    return userSocketMap[reciverId];
}

io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};