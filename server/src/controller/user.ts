import { Request, RequestHandler, Response } from "express";
import { userSchema } from "../lib/zodSchema";
import { comparePassword, hashPassword } from "../lib/hashPassword";
import { CreateUser, findUser } from "../service/user";
import { createToken } from "../lib/token";

// user registraion controller
const register: RequestHandler = async (req, res, next)=>{
    const verifyInputWithSuccess = userSchema.safeParse(req.body)
    if(!verifyInputWithSuccess.success){
        res.status(400).json({
            message: "Incorect format"
        })
        return;
    }

    const {username, email, password} = verifyInputWithSuccess.data;

    try {
        const hashedPassword = await hashPassword(password) as string;
        await CreateUser(username, email, hashedPassword)
        res.status(200).json({
            message: "User registered successfuly"
        })
        return;
        
    } catch (error) {
        console.log(error);
        next();
    }
    
}

//user login controller
const login: RequestHandler = async(req, res, next)=>{
    const {email, password} = req.body;

    try {
        const foundUser = await findUser(email);
        if(!foundUser){
            res.status(404).json({
                message: "user not found"
            })
            return;
        }
        const passwordMatch = await comparePassword(password, foundUser.password);
        if(!passwordMatch){
            res.status(404).json({
                message: "Invalid email or password"
            })
            return;
        }
        const token = createToken({id:foundUser.user_id}) as string
        if(!token){
            res.status(500).json({
                message: "Token not created"
            })
            return;
        }
        res.status(200).json({
            token: token,
            message:"User logined"
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const checkAuth = (req: Request, res: Response)=>{
    try {
        
        res.status(200).json(req.userId);
    } catch (error) {
        console.log(`Error while checking auth ${error}`);
        res.status(500).json("Internal server error");
    }
}

export default {register, login,checkAuth };