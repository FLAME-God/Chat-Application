import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getMesssage(senderId: number, receiverId: number){
    if (isNaN(senderId) || isNaN(receiverId)) {
        return
    }
    
    return await client.messages.findMany({
        where:{
            OR:[{sender_id: senderId, receiver_id: receiverId},
                {sender_id: receiverId, receiver_id: senderId}
            ]
        }
    })
}
export async function createMesssage(senderId: number, receiverId: number, text: string ){
    if (isNaN(senderId) || isNaN(receiverId) || !text) {
        console.log("something is missing");
        return;
    }
    return await client.messages.create({
        data:{
            sender_id: senderId,
            receiver_id: receiverId,
            message: text
        }
    })
}

export async function getUserforMsg(userId: number){
    
    return await client.users.findMany({
        where: {
            NOT: {
                user_id: userId,
            },
        },
        select: {
            user_id: true,
            username: true,
            avatar: true,
        },
    });
}