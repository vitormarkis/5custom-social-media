import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { ENCookies, ENToken } from "../constants/secret"

export const requireAuth: RequestHandler = (request, response, next) => {
  const accessToken = request.cookies[ENCookies.ACCESS_TOKEN]

  console.log("accessToken: ", JSON.parse(JSON.stringify(request.cookies)))
  
  console.log({ cookies: request.cookies })

  if (!accessToken) return response.status(401).json({ message: "Token não fornecido." })

  try {
    jwt.verify(accessToken, ENToken.JWT_SECRET_TOKEN)
    return next()
  } catch (error) {
    return response.status(401).json({ message: "Token inválido." })
  }
}
