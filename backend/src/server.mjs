import express from "express"
import dotenv from "dotenv"
import helloRouter from "./routers/hello.Router.mjs"
import videoRouter from "./routers/video.Router.mjs"
import commentsRouter from "./routers/comments.Router.mjs"
import userRouter from "./routers/user.Router.mjs"
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api", helloRouter)
app.use("/api", videoRouter)
app.use("/api", commentsRouter)
app.use('/api', userRouter)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
