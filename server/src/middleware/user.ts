import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/token";

declare global {
    namespace Express {
        interface Request {
            userId?: number; // Optional because middleware might not always set it
        }
    }
}

type AuthenticatedRequestHandeler = (req: Request, res: Response, next: NextFunction)=>void;

export const userAuth: AuthenticatedRequestHandeler = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(403).json({
            message:"Token is required"
        })
    }
    const token = authHeader.startsWith("Bearer ")? authHeader.split("")[1]: authHeader;
    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(`Error while verifying the token: ${error}`);
        return res.status(403).json({
            message: "You are not signed in",
        });
    }
}