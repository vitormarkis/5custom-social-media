import express from "express"
import * as AuthControllers from "../controllers/auth"

const authRouter = express.Router()

authRouter.post("/register", AuthControllers.register)
authRouter.post("/login", AuthControllers.login)
authRouter.post("/logout", AuthControllers.logout)

export default authRouter
