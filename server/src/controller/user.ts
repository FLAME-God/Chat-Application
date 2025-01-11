import { Request, RequestHandler, Response } from "express";
import { userSchema } from "../lib/zodSchema";
import { comparePassword, hashPassword } from "../lib/hashPassword";
import { CreateUser, findUser, getUser } from "../service/user";
import { createToken } from "../lib/token";
import cloudinary from "../lib/cloudenary";
import { createAvatar, getAvatar } from "../service/avatar";
import { AuthenticatedRequestHandler } from "../middleware/user";

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
        const hasedPassword = foundUser.password;
        const userPassword = password;
        const passwordMatch = await comparePassword(userPassword, hasedPassword);
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
const checkAuth: AuthenticatedRequestHandler  = async(req, res)=>{
    try {
        const userId = req.userId!;
        const user = await getUser(userId);
        const username = user?.username;
        const email = user?.email;
        const avatar = await getAvatar(userId);
        res.status(200).json({
            userId: user?.user_id,
            username: username,
            email: email,
            avatar: avatar?.url
        });        
    } catch (error) {
        console.log(`Error while checking auth ${error}`);
        res.status(500).json("Internal server error");
    }
}
// user avatar controller
 const userAvatar: AuthenticatedRequestHandler  = async (req, res) => {
    const userId = req.userId!;
    console.log("request is comming");
    const profilePic = req.body.profilePic;
    console.log("request is excecuted");
    try {
        if (!profilePic) {
            res.status(400).json({
                message: "Profile picture is required",
            });
            return;
        }
        const uploadRes = await cloudinary.uploader.upload(profilePic, {
            folder: "user_avatars", 
        });
        const updatedUser = await createAvatar(uploadRes.url, userId);
        const url = updatedUser.url;
        const user =await getUser(userId);
        const username = user?.username;
        const email = user?.email;
        res.status(200).json({
            message: "Avatar uploaded successfully",
            avatar: url,
            username: username,
            email: email
        });
    } catch (error) {
        console.error(`Error while uploading avatar: ${error}`);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export default {register, login, checkAuth, userAvatar };