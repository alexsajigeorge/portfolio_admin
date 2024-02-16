import { z } from "zod";


const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
})

export default LoginSchema;