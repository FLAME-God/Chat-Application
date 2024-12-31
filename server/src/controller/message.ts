import { Request, Response } from "express";
import { createMesssage, getMesssage } from "../service/message";

// Controller to send message
const sendMessage = async(req: Request, res: Response)=>{
    const reciverId = parseInt(req.params.id);
    const senderId = req.userId;
    const text = req.body.text;
    try {
        const message = await createMesssage(senderId!, reciverId, text)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Controller to get all messages between two users
const getAllMessage = async(req: Request, res: Response)=>{
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

export default {sendMessage, getAllMessage};