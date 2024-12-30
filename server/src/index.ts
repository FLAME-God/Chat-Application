import express, { Express } from "express";
import appRouter from "./routes/index";
import http from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());

const server = http.createServer(app);
export const io = new Server(server)



app.use("/api/v1", appRouter);

async function main(){
    server.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

main();