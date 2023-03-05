import express from "express"
import * as PostsControllers from "../controllers/posts"

const postsRouter = express.Router()

postsRouter.get("/", PostsControllers.getPosts)
postsRouter.post("/", PostsControllers.createPost)

export default postsRouter
