import { z } from "zod"
import { postSchema } from "./posts"
import { userSchema } from "./users"

export const postLikesSchema = z.object({
  post_like_id: z.number().positive(),
  user_id: userSchema.shape.id,
  post_id: postSchema.shape.id,
})

export const likedPostSchema = z
  .array(postLikesSchema)
  .transform((postLikes) => postLikes.reduce((acc: number[], item) => (acc.push(item.post_id), acc), []))

export type IPostLikes = z.infer<typeof postLikesSchema>
export type ILikedPost = z.infer<typeof likedPostSchema>

/**
 * BODY
 */
export const postLikesBodySchema = postLikesSchema.pick({
  user_id: true,
  post_id: true,
})

export type IPostLikesBody = z.infer<typeof postLikesBodySchema>
