import express, { Express } from "express";
import dbConnection from "./utils/db";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());



async function server(){
    await dbConnection();
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

server();