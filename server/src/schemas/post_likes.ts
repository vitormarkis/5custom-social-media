import { z } from "zod"
import { postSchema } from "./posts"
import { userSchema } from "./user"

export const postLikesSchema = z.object({
  post_like_id: z.number().positive(),
  user_id: userSchema.shape.id,
  post_id: postSchema.shape.id,
})

export type IPostLikes = z.infer<typeof postLikesSchema>
