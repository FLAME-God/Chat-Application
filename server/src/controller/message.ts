import { NextFunction, Request, Response } from "express";
import { createMesssage, getMesssage, getUserforMsg } from "../service/message";
import { AuthenticatedRequestHandler } from "../middleware/user";


// Controller to send message
const sendMessage: AuthenticatedRequestHandler = async(req, res)=>{
    const reciverId = parseInt(req.params.id);
    const senderId = req.userId;
    const text = req.body.text;
    try {
        const message = await createMesssage(senderId!, reciverId, text);
        res.status(200).json(message)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Controller to get all messages between two users
const getAllMessage: AuthenticatedRequestHandler  = async(req, res)=>{
    const receiverId = parseInt(req.params.id);
    const senderId = req.userId;
    try {
        const messages = await getMesssage(senderId!, receiverId);
        res.status(200).json({
            messages
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        
    }
}
// get all users for messages
export const getAllUsersforMsg:AuthenticatedRequestHandler = async(req, res)=>{
    try {
        const userId = req.userId!;        
        const userstoMsg = await getUserforMsg(userId);
        
        res.status(200).json(userstoMsg);
        
    } catch (error) {
        console.log(`Error while getting users for messages ${error}`);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export default {sendMessage, getAllMessage, getAllUsersforMsg};