import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());



async function server(){
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

server();