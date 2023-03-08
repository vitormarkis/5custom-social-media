import { z } from "zod"
import { postSchema } from "./posts"
import { userSchema } from "./users"

/**
 * GENERAL
 */

export const postLikesSchema = z.object({
  post_like_id: z.number().positive(),
  user_id: userSchema.shape.id,
  post_id: postSchema.shape.id,
})

export type IPostLikes = z.infer<typeof postLikesSchema>

/**
 * BODY
 */
export const postLikesBodySchema = postLikesSchema.pick({
  post_id: true
})

export type IPostLikesBody = z.infer<typeof postLikesBodySchema>