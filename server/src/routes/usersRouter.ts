import express from "express"
import * as UserControllers from "../controllers/users"

const usersRouter = express.Router()

usersRouter.get("/", UserControllers.getUsers)
usersRouter.get("/all", UserControllers.getAllUsers)

usersRouter.get("/liked-posts", UserControllers.getLikedPosts)

usersRouter.get("/relationships", UserControllers.getRelationships)
usersRouter.put("/relationships", UserControllers.toggleRelationship)

export default usersRouter
