import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function createAvatar(url: string, userId: number){
    return await client.avatar.create({
        data:{
            url: url,
            user_id: userId
        }
    })
}