import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/token";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Optional because middleware might not always set it
    }
  }
}

type AuthenticatedRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const userAuth: AuthenticatedRequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      message: "Token is required",
    });
  }

  // Split the token from "Bearer <token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // Assuming verifyToken returns an object with an `id` property
    console.log("hi there");
    const decoded = verifyToken(token) as { id: number };
    console.log("i am not there");
    
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(`Error while verifying the token: ${error}`);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
