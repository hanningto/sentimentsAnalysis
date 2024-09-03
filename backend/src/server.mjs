import express from "express"
import dotenv from "dotenv"
import helloRouter from "./routers/hello.Router.mjs"
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api", helloRouter)
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})
