import {z} from "zod";

export const userSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8).refine((value)=>/[A-Z]/.test(value)).refine((value)=>/[!@#$%&*]/.test(value))
})