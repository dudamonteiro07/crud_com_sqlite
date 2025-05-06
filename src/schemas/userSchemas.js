import { z } from "zod"

export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
        .min(6, "A senha deve ter pelo menos uma letra maiscula")
        .regex(/[A-Z]/)
})

export const updatedUserSchema = z.object({
    name: z.string().min(3, "o nome deve ter pelo menos 3 chars").optional(),
    email: z.string().email(),
    password: z.string().min(6)
        .min(6, "A senha deve ter pelo menos uma letra maiscula")
        .regex(/[A-Z]/).optional()
})