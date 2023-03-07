import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { requireAuth } from "./middlewares/ensureAuth"
import authRouter from "./routes/authRouter"
import postsRouter from "./routes/postsRouter"
import usersRouter from "./routes/usersRouter"
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(cookieParser())

app.use("/api/auth/", authRouter)
app.use("/api/posts/", requireAuth, postsRouter)
app.use("/api/users/", requireAuth, usersRouter)


app.listen(process.env.PORT, () => console.log("Servidor iniciando na porta " + process.env.PORT))
