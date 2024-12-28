import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function messsage(senderId: number, receiverId: number, text: string ){
    return await client.messages.create({
        data:{
            sender_id: senderId,
            receiver_id: receiverId,
            message: text
        }
    })
}