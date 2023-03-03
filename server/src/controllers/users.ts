import { RequestHandler } from "express"
import { RowDataPacket } from "mysql2"
import { TUser, userSchema } from "../schemas/user"
import { connection } from "../services/mysql"

const requestSchema = userSchema.pick({
  username: true,
})

interface UserQuery extends RowDataPacket, TUser {}

export const getUsers: RequestHandler = (request, response) => {
  const { username } = requestSchema.parse(request.body)
  const q = "select * from users where username = ?"
  connection.query<UserQuery[]>(q, [username], (error, result) => {
    if (error) return response.json(error)
    if (result.length === 0) return response.status(404).json({ message: "Usuário não encontrado." })
    const { password, ...user } = result[0]
    return response.json(user)
  })
}
