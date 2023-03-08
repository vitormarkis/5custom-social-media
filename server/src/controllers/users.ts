import { RequestHandler } from "express"
import { RowDataPacket } from "mysql2"
import { relationShipToggleSchema } from "../schemas/relationships"
import { TUser } from "../schemas/users"
import { connection } from "../services/mysql"
import { IRelationshipsId } from "../types/relationships"

interface UserQuery extends RowDataPacket, TUser {}
interface RelationshipsQuery extends RowDataPacket, IRelationshipsId {}
interface GetAllUsers extends RowDataPacket, TUser {}

export const getUsers: RequestHandler = (request, response) => {
  const { userId } = request

  const q = "select * from users where id = ?"
  connection.query<UserQuery[]>(q, [userId], (error, result) => {
    if (error) return response.status(500).json(error)
    if (result.length === 0) return response.status(404).json({ message: "Usuário não encontrado." })
    const { password, ...user } = result[0]
    return response.json(user)
  })
}

export const getRelationships: RequestHandler = (request, response) => {
  const { userId } = request

  const q = `
  select id as relationship_id, followed_user_id 
  from relationships as r 
  where follower_user_id = (?)
  `

  connection.query<RelationshipsQuery[]>(q, [userId], (error, relationships) => {
    if (error) return response.status(500).json(error)
    return response.json(relationships)
  })
}

export const toggleRelationship: RequestHandler = (request, response) => {
  const { followed_user_id } = relationShipToggleSchema.parse(request.body)
  const { userId } = request

  const q = "select * from relationships where follower_user_id = (?) AND followed_user_id = (?)"

  connection.query<RelationshipsQuery[]>(q, [userId, followed_user_id], (error, found) => {
    if (error) return response.status(500).json(error)
    const isAdding = found.length === 0

    console.log({ isAdding })

    const addQ = "insert into relationships (follower_user_id, followed_user_id) values (?, ?);"

    const deleteQ = "delete from relationships where follower_user_id = (?) AND followed_user_id = (?);"

    const q = isAdding ? addQ : deleteQ

    connection.query<RelationshipsQuery[]>(q, [userId, followed_user_id], error => {
      if (error) return response.json(error)
      return response.send("Toggle do usuário " + userId + " no usuário " + followed_user_id)
    })
  })
}

export const getAllUsers: RequestHandler = (request, response) => {
  const q = "select * from users"
  connection.query<GetAllUsers[]>(q, [], (error, usersWithPassword) => {
    if (error) return response.status(500).json(error)
    const users = usersWithPassword.map(({ password, ...rest }) => rest)
    return response.json(users)
  })
}
