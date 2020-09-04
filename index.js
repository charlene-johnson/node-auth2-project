const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const userRouter = require("./users/users-router")
const cookieParser = require("cookie-parser")

const server = express()
const port = process.env.PORT || 6000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())


server.use("/api", userRouter)
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong, please try again",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})