import express, { Express, NextFunction, Request, Response } from "express";
import appRouter from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api/v1", appRouter);
const routeError = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found",
    });
};
app.use(routeError);

async function main(){
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

main();