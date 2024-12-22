import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();

//createing user
export async function CreateUser (username: string, email: string, password: string ){
    const user = await client.users.create({
        data:{
            username: username,
            email: email,
            password: password 
        }
    })
    return user;
}

// finding user
export async function findUser(email: string){
    const user = client.users.findFirst({
        where:{
            email:email
        }
    })
    return user;
}