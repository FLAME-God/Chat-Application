import express, { Express } from "express";
import userRouter from "./routes/user";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());



app.use("/api/v1", userRouter);

async function server(){
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

server();