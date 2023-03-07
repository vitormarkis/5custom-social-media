import { z } from "zod"
import { userSchema } from "../_features/LamaAuth/schemas"
import { postSchema } from "./posts"

// text, post_id, author_id BODY POST
export const commentariesSchema = z.object({
  commentaryId: z.number(),
  text: z.string(),
  created_at: z.date(),
  author_id: z.number().positive(),
})

export const postCommentsSchema = z.object({
  commentaryId: commentariesSchema.shape.commentaryId,
  text: commentariesSchema.shape.text,
  created_at: commentariesSchema.shape.created_at,
  author_id: commentariesSchema.shape.author_id,
  name: userSchema.shape.name,
  username: userSchema.shape.username,
  profile_pic: userSchema.shape.profile_pic,
  post_id: postSchema.shape.id,
})

export type IPostComment = z.infer<typeof postCommentsSchema>
