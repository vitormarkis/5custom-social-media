import express from "express"
import * as UserControllers from "../controllers/users"

const usersRouter = express.Router()

usersRouter.get("/", UserControllers.getUsers)

export default usersRouter
