import jwt, { JwtPayload } from "jsonwebtoken";

const jwt_secret = process.env.JWT_PASSWORD || "kjsguynqwidg";

interface CustomJwtPayload extends JwtPayload{
    id: number
} 

export function createToken (payload: CustomJwtPayload){
    return `Bearer ${jwt.sign(payload, jwt_secret, {expiresIn:"1d"})}`;
}

export function verifyToken (token: string){
    return jwt.verify(token, jwt_secret) as CustomJwtPayload
}