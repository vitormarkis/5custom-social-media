import { z } from "zod"

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string().max(30),
  avatar_url: z.string().url(),
  password: z.string().max(30).optional(),
})

export const loginSchema = userSchema.pick({
  username: true,
  password: true,
})

export const tokenSchema = z.string().min(15)