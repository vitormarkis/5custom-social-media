import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import authRouter from "./routes/authRoutes"
import postsRouter from "./routes/postsRoutes"
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

app.use("/api/posts/", postsRouter)
app.use("/api/auth/", authRouter)

app.listen(process.env.PORT, () => console.log("Servidor iniciando na porta " + process.env.PORT))
