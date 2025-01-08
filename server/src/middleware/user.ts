import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/token";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export type AuthenticatedRequestHandler = (
  req: AuthenticatedRequest,
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
    const decoded = verifyToken(token) as { id: number };
    
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(`Error while verifying the token: ${error}`);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
