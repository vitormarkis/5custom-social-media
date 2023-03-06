import { RequestHandler } from "express"
import { RowDataPacket } from "mysql2"
import { IPost, postAPIResponseSchema, postBodySchema } from "../schemas/posts"
import { IUser, TUser } from "../schemas/user"
import { connection } from "../services/mysql"

interface Query extends TUser, IPost, RowDataPacket {}
interface User extends IUser, IPost {}

export const getPosts: RequestHandler = (request, response) => {
  const { userId } = request

  const q = `
  SELECT p.*, p.id as post_id, u.profile_pic, u.username
  FROM posts as p
  join relationships as r
  on p.author_id = r.followed_user_id
  join users as u
  on u.id = p.author_id
  where r.follower_user_id = (?)
`

const newQ = `
select p.*, p.id as post_id, u.profile_pic, u.username
from posts as p
left join relationships as r
on r.followed_user_id = p.author_id and r.follower_user_id = (?)
join users as u
on p.author_id = u.id
where p.author_id = (?) or p.author_id = r.followed_user_id
`

  connection.query<Query[]>(newQ, [userId, userId], (error, posts) => {
    if (error) return response.status(500).json(error)
    const filteredPosts = posts.map(({ password, ...rest }) => postAPIResponseSchema.safeParse(rest).data)
    return response.status(201).json(filteredPosts)
  })
}

export const createPost: RequestHandler = (request, response) => {
  const { userId: author_id } = request
  const parsedPostBody = postBodySchema.parse(request.body)

  const text_q = "insert into posts (text, author_id) values (?, ?)"
  const image_q = "insert into posts (text, author_id, image) values (?, ?, ?)"

  const q = "image" in parsedPostBody ? image_q : text_q

  connection.query(q, [parsedPostBody.text, author_id, parsedPostBody.image], error => {
    if (error) return response.status(500).json(error)
    return response.status(201).json({ message: "Post criado com sucesso!" })
  })
}
