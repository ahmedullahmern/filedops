import express from 'express'
import mongoose from 'mongoose'
import ENV from './constant/index.js'
import authRouter from './routes/auth.js'
import jobRouter from './routes/job.js'
import cors from 'cors'
import adminRouter from './routes/admin.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/job", jobRouter)
app.use("/api/admin", adminRouter)

app.use("/", (req, res) => {
    res.send({ msg: "ahmed" })
})

mongoose.connect(`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@lms-app.oxyap.mongodb.net/${ENV.DB_NAME}`)
mongoose.connection.on("connected", () => {
    console.log("---DB_Connected---")
})

app.listen("3000", () => {
    console.log("Server Is Runing Is 3000")
})