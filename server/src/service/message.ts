import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getMesssage(senderId: number, receiverId: number){
    return await client.messages.findMany({
        where:{
            OR:[{sender_id: senderId, receiver_id: receiverId},
                {sender_id: receiverId, receiver_id: senderId}
            ]
        }
    })
}
export async function createMesssage(senderId: number, receiverId: number, text: string ){
    return await client.messages.create({
        data:{
            sender_id: senderId,
            receiver_id: receiverId,
            message: text
        }
    })
}