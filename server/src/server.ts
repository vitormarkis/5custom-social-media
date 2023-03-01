import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import authRouter from "./routes/authRoutes"
import userRouter from "./routes/userRoutes"
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/users/", userRouter)
app.use("/api/auth/", authRouter)

app.listen(process.env.PORT, () => console.log("Servidor iniciando na porta " + process.env.PORT))
