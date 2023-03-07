import { RequestHandler } from "express"
import { RowDataPacket } from "mysql2"
import { z } from "zod"
import { postCommentBodySchema, postCommentsSchema } from "../schemas/postComments"
import { postAPIResponseSchema, postBodySchema } from "../schemas/posts"
import { connection } from "../services/mysql"

type Query = {} & unknown & RowDataPacket

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
    select 
      p.*, 
      p.id as post_id, 
      u.profile_pic, 
      u.username
    from posts as p
    left join relationships as r
    on r.followed_user_id = p.author_id and r.follower_user_id = (?)
    join users as u
    on p.author_id = u.id
    where p.author_id = (?) or p.author_id = r.followed_user_id
`

  connection.query<Query[]>(newQ, [userId, userId], (error, posts) => {
    if (error) return response.status(500).json(error)
    const filteredPosts = posts.map(({ password, ...rest }) => postAPIResponseSchema.parse(rest))
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

export const getPost: RequestHandler = (request, response) => {
  const { postId } = request.params

  const q = "select * from posts as p join users as u on u.id = p.author_id where p.id = (?)"

  connection.query<any[]>(q, [postId], (error, result) => {
    if (error) return response.status(500).json(error)
    const post = result[0]
    return response.status(201).json(post)
  })
}

export const getPostComments: RequestHandler = (request, response) => {
  const { postId } = request.params

  const q = `
    SELECT 
      c.id as commentaryId, 
      c.text, 
      c.created_at, 
      c.author_id, 
      c.post_id, 
      u.name, 
      u.username, 
      u.profile_pic 
    FROM comments as c 
    join users as u 
    on u.id = c.author_id 
    where post_id = (?)
    `

  connection.query<Query[]>(q, [postId], (error, result) => {
    if (error) return response.status(500).json(error)
    const postComments = z.array(postCommentsSchema).parse(result)
    return response.status(201).json(postComments)
  })
}

export const createPostComment: RequestHandler = (request, response) => {
  const { postId } = request.params
  const q = `select * from posts where id = (?)`

  connection.query<Query[]>(q, [postId], (error, result) => {
    if (error) return response.status(500).json(error)
    if (result.length === 0) return response.status(400).json({ message: "Não existe um post com esse id." })

    const { userId } = request
    const unkCommentBody = {
      ...request.body,
      post_id: Number(postId),
      author_id: Number(userId),
    }
    const { author_id, post_id, text } = postCommentBodySchema.parse(unkCommentBody)

    const q = `
    insert into
    comments (
      text, 
      post_id, 
      author_id
    )
    values
    (?, ?, ?)
  `

    connection.query(q, [text, post_id, author_id], error => {
      if (error) return response.status(500).json(error)
      return response.status(201).json({ message: "Comentário criado com sucesso!" })
    })
  })
}
