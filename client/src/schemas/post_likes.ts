import { z } from "zod"
import { postSchema } from "./posts"
import { userSchema } from "./users"

export const postLikesSchema = z.object({
  post_like_id: z.number().positive(),
  user_id: userSchema.shape.id,
  post_id: postSchema.shape.id,
})

export const likedPost = postLikesSchema.shape.post_id

export type IPostLikes = z.infer<typeof postLikesSchema>
export type ILikedPost = z.infer<typeof likedPost>
