import express from "express"
import { requireAuth } from "../middlewares/ensureAuth"

const postsRouter = express.Router()

postsRouter.get("/", requireAuth, (request, response) => {
  return response.status(200).json("Aqui está a lista de posts.")
})

export default postsRouter
