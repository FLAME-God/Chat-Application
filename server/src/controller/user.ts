import { Request, RequestHandler, Response } from "express";
import { userSchema } from "../lib/zodSchema";
import { comparePassword, hashPassword } from "../lib/hashPassword";
import { CreateUser, findUser } from "../service/user";
import { createToken } from "../lib/token";
import message from "./message";
import cloudinary from "../lib/cloudenary";
import { createAvatar } from "../service/avatar";

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

// check user controller
const checkAuth = (req: Request, res: Response)=>{
    try {
        res.status(200).json({
            userId: req.userId
        });        
    } catch (error) {
        console.log(`Error while checking auth ${error}`);
        res.status(500).json("Internal server error");
    }
}
// user avatar controller
const userAvatar = async(req: Request, res: Response) =>{
    const userId = req.userId!;
    const profilePic = req.body;
    try {
        if(!profilePic){
            return res.status(400).json({
                message:"Profile pic is required"
            })
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic).then(result => {return result.url});
        const updatedUser = await createAvatar(uploadRes, userId);
        res.status(200).json({
            message:"avater uploaded successfuly",
            updatedUser
        })
    } catch (error) {
        console.log(`Error ehile uploading avatar ${error}`);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
export default {register, login,checkAuth, userAvatar };