import bcrypt from "bcryptjs"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { RowDataPacket } from "mysql2"
import { ENCookies, ENToken } from "../constants/secret"
import { loginCredentialsSchema, registerCredentialsSchema, TUser } from "../schemas/user"
import { connection } from "../services/mysql"

interface LoginQuery extends RowDataPacket, TUser {}

export const register: RequestHandler = (request, response) => {
  const credentials = registerCredentialsSchema.parse(request.body)

  const q = "select * from users where username = ?"

  connection.query<[]>(q, [credentials.username], (error, result) => {
    if (error) return response.status(500).json(error)
    if (result.length > 0)
      return response.status(409).json({ message: "Um usuário com esse username já existe." })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(credentials.password, salt)

    const q = "insert into users (name, username, email, password) values (?, ?, ?, ?)"

    const payload = [credentials.name, credentials.username, credentials.email, hashedPassword]

    connection.query(q, payload, (error, result) => {
      if (error) return response.status(500).json(error)
      return response.status(201).json({ message: "Usuário registrado com sucesso!", payload: result })
    })
  })
}

export const login: RequestHandler = (request, response) => {
  const credentials = loginCredentialsSchema.parse(request.body)
  const q = "select * from users where username = ?"

  connection.query<LoginQuery[]>(q, [credentials.username], (error, data) => {
    const loginUser = data[0]

    if (error) return response.status(500).json(error)
    if (data.length === 0) return response.status(404).json({ message: "Usuário não encontrado." })

    const match = bcrypt.compareSync(credentials.password, loginUser.password)
    if (!match) return response.status(400).json({ message: "Usuário ou senha incorretos." })

    const token = jwt.sign({ id: loginUser.id }, ENToken.JWT_SECRET_TOKEN)
    const { password, ...returnedUser } = loginUser

    response
      .cookie(ENCookies.ACESS_TOKEN, token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Usuário logado!", user: returnedUser })
  })
}

export const logout: RequestHandler = (request, response) => {
  return response
    .clearCookie(ENCookies.ACESS_TOKEN, {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "Usuário deslogado." })
}
