import { z } from "zod"
import { userSchema } from "../_features/LamaAuth/schemas"
import { postSchema } from "./posts"

// text, post_id, author_id BODY POST
export const commentsSchema = z.object({
  commentaryId: z.number(),
  text: z.string(),
  created_at: z.date(),
  author_id: z.number().positive(),
})

export const postCommentBodySchema = z.object({
  text: commentsSchema.shape.text,
})

export const postCommentsSchema = z.object({
  commentaryId: commentsSchema.shape.commentaryId,
  text: commentsSchema.shape.text,
  created_at: commentsSchema.shape.created_at,
  author_id: commentsSchema.shape.author_id,
  name: userSchema.shape.name,
  username: userSchema.shape.username,
  profile_pic: userSchema.shape.profile_pic,
  post_id: postSchema.shape.id,
})

export type IPostComment = z.infer<typeof postCommentsSchema>
