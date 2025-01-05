import express, { Express } from "express";
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

async function main(){
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

main();