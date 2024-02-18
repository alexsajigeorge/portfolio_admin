import { z } from "zod";


const LoginSchema = z.object({
    email: z.string().email().min(1, {message: "Email is required"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
})

export default LoginSchema;