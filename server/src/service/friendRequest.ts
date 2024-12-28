import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function sendRequest(senderId: number, receiverId: any){
    return await client.friendRequests.create({
        data:{
            sender_id:senderId,
            receiver_id: receiverId,
            status:"pending"
        }
    })
}

export async function acceptRequest(requestId: number){
    // update the friend request table
    const request = await client.friendRequests.update({
        where:{
            id: requestId
        },
        data:{status:"accepted"}
    })

    // add to friends table
    return await client.friends.create({
        data:{
            user1_id: request.sender_id,
            user2_id: request.receiver_id
        }
    })
}

export async function getPendingRequest(userId: number){
    const request = await client.friendRequests.findMany({
        where:{
            receiver_id:userId,
            status: "pending"
        }
    })
    return request;
}

export async function rejectRequest(requestId:number) {
    return await client.friendRequests.update({
        where:{id: requestId},
        data:{status: "rejected"}
    })
}

export async function getAllFriends(userId: number){
    const friends = await client.friends.findMany({
        where:{
            OR:[{user1_id:userId},{user2_id:userId}]
        },
        include:{user1:true, user2:true}
    })

    // Extract all friends
    return friends.map(friends=>{friends.user1_id===userId? friends.user2: friends.user1})
}

