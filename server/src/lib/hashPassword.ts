import bcrypt from "bcrypt";

export async function hashPassword(password: string){
    return await bcrypt.hash(password, 10);
}

export async function comparePassword (userPassword:string, hashPassword: string){
    return await bcrypt.compare(userPassword, hashPassword)
}

