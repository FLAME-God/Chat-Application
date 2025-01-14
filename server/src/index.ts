import express, { NextFunction, Request, Response } from "express";
import  router from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";
import { app, server } from "./lib/socket";
dotenv.config();

app.use(express.json());

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}))

app.use("/api/v1", router);
const routeError = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found",
    });
};
app.use(routeError);

async function main(){
    server.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

main();