import { RequestHandler } from "express"
import { RowDataPacket } from "mysql2"
import { IPost, postBodySchema } from "../schemas/posts"
import { IUser, TUser } from "../schemas/user"
import { connection } from "../services/mysql"

interface Query extends TUser, IPost, RowDataPacket {}
interface User extends IUser, IPost {}

export const getPosts: RequestHandler = (request, response) => {
  // const { userId } = request

  const q =
    "select u.*, u.id as user_id, p.*, p.id as post_id, p.created_at as post_created_at from posts as p join users as u on p.author_id = u.id;"

  connection.query<Query[]>(q, [], (error, posts) => {
    if (error) return response.status(500).json(error)
    const filteredPosts = posts.map(({ password, ...rest }) => rest)
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
