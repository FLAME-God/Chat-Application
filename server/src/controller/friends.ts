import { Request, Response, NextFunction } from "express";
import { acceptRequest, getPendingRequest, sendRequest } from "../service/friendRequest";


interface AuthenticatedRequest extends Request{
    userId: number
}
const sendFriendReq = async(req: AuthenticatedRequest, res: Response, next:NextFunction)=>{
    const recevierId = req.params.id;
    const senderId = req.userId;
    try {
        await sendRequest(senderId, recevierId);
        res.status(200).json({
            message: "friend request sent Successfully"
        })
    } catch (error) {
        console.log(error); //for devlopment purpose
        next(error);
    }
}

const acceptFriendReq = async(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    const userId = req.userId;
    try {
        const friendRequest = await getPendingRequest(userId);
        const requestId = friendRequest.findIndex(friendreq=>friendreq.id);

        await acceptRequest(requestId);
        res.status(200).json({
            message:"friend accepted successfuly"
        })
    } catch (error) {
        console.log(error) //for devlopment purpose
        next(error)
    }
}

export default {sendFriendReq, acceptFriendReq}