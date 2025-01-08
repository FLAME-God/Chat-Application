import { Request, Response, NextFunction } from "express";
import { acceptRequest, getAllFriends, getPendingRequest, rejectRequest, sendRequest } from "../service/friendRequest";
import { AuthenticatedRequestHandler } from "../middleware/user";



// Cntroller to send friend request
const sendFriendReq: AuthenticatedRequestHandler  = async(req, res, next)=>{
    const recevierId = req.params.id;
    const senderId = req.userId!;
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

//get All pending friend retuest
const allFriendReq: AuthenticatedRequestHandler  = async(req, res, next)=>{
    const userId = req.userId!;
    try {
        const friendRequests = await getPendingRequest(userId);
        res.status(200).json({
            message:"friend accepted successfuly",
            friendRequests
        })
    } catch (error) {
        console.log(error) //for devlopment purpose
        next(error)
    }
}

// cntroller to accept friend request
const acceptFriendReq: AuthenticatedRequestHandler  = async (req, res, next)=>{
    const requestId = req.body;
    try {
        await acceptRequest(requestId);
        res.status(200).json({
            message:"Friend Request accepted"
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Controller to reject Friend Request
const rejectFriendReq = async (req: Request, res: Response, next: NextFunction)=>{
    const requestId = req.body;
    try {
        await rejectRequest(requestId);
        res.status(200).json({
            message:"Friend Request rejected"
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Controller to get All Friends
const getAllFriend: AuthenticatedRequestHandler  = async (req, res, next)=>{
    const usertId = req.userId!;
    try {
        const allFriends = await getAllFriends(usertId);
        res.status(200).json({
            message:"All friends faitched",
            allFriends
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}



export default {sendFriendReq, allFriendReq, acceptFriendReq, rejectFriendReq, getAllFriend}