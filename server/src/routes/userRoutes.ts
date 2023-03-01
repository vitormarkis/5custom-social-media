import express from "express"

const userRouter = express.Router()

userRouter.get("/", (request, response) => {
  return response.status(200).send("Está funcionando.")
})

export default userRouter
