import express from "express"
import { requireAuth } from "../middlewares/ensureAuth"

const userRouter = express.Router()

userRouter.get("/", requireAuth, (request, response) => {
  return response.status(200).json("Aqui está a lista de usuários.")
})

export default userRouter
