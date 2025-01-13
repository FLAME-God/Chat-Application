import express, { Express, NextFunction, Request, Response } from "express";
import appRouter from "./routes/index";
import cors from "cors";
import dotenv from "dotenv";
import { app, server } from "./lib/socket";
dotenv.config();
import path from "path";

const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}))

app.use("/api/v1", appRouter);
const routeError = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route not found",
    });
};
app.use(routeError);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  }

async function main(){
    server.listen(process.env.PORT, ()=>{
        console.log(`server is listing on port ${process.env.PORT}`);
        
    })
}

main();