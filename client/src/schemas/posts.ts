import { z } from "zod"

export const postBodySchema = z.object({
  text: z.string().max(449),
  image: z.string().url().optional(),
})

export const postSchema = z.object({
  id: z.number().positive(),
  text: z.string().max(449),
  image: z.string().url().optional(),
  author_id: z.number().positive(),
  created_at: z.string().transform((createdAt) => new Date(createdAt)),
})

export type IPostInput = z.input<typeof postSchema>
export type IPost = z.output<typeof postSchema>
export type IPostBody = z.infer<typeof postBodySchema>
