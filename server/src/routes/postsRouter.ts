import express from "express"
import * as PostsControllers from "../controllers/posts"

const postsRouter = express.Router()

postsRouter.get("/", PostsControllers.getPosts)
postsRouter.get("/:postId", PostsControllers.getPost)
postsRouter.post("/", PostsControllers.createPost)

export default postsRouter
