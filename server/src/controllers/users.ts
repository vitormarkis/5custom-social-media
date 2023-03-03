import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { RowDataPacket } from "mysql2"
import { ENCookies } from "../constants/secret"
import { TUser } from "../schemas/user"
import { connection } from "../services/mysql"

interface UserQuery extends RowDataPacket, TUser {}

export const getUsers: RequestHandler = (request, response) => {
  const token = request.cookies[ENCookies.ACCESS_TOKEN]
  const { sub } = jwt.decode(token)

  console.log({ token, sub })
  
  const q = "select * from users where id = ?"
  connection.query<UserQuery[]>(q, [sub], (error, result) => {
    if (error) return response.json(error)
    if (result.length === 0) return response.status(404).json({ message: "Usuário não encontrado." })
    const { password, ...user } = result[0]
    return response.json(user)
  })
}
