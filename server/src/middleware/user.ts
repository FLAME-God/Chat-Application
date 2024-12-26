import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/token";

interface AuthecicatedRequest extends Request {
    user_id?: number;
}

export const userAuth = (req: AuthecicatedRequest, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(403).json({
            message:"Token is required"
        })
    }
    const token = authHeader.startsWith("Bearer ")? authHeader.split("")[1]: authHeader;
    try {
        const decoded = verifyToken(token);
        req.user_id = decoded.id;
        next();
    } catch (error) {
        console.error(`Error while verifying the token: ${error}`);
        return res.status(403).json({
            message: "You are not signed in",
        });
    }
}