const express = require("express")
const app = express()
const PORT = 5000
const cors = require("cors")
const jwt = require("jsonwebtoken")
const utils = require("./utils")


const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")

app.use(express.json({limit: "25mb"}))
app.use(cors())
app.use(express.urlencoded({limit: "25mb"}))
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})


app.use((request, response, next) => {
    try {
        if (request.url == '/user/register' || request.url == '/user/login') {
            next()
        } else {
            const tokenId = request.headers['token']
            if (!tokenId || tokenId?.length === 0) {
                response.send(utils.createError('Missing token'))
                return
            }

            const payload = jwt.verify(tokenId, '123456789')
            request.user = payload
            next()
        }
    } catch (error) {
        console.log(error)
        response.send(utils.createError('Invalid token'))
    }

})


app.use("/user", userRouter)
app.use("/blog", blogRouter)



app.listen(PORT, '0.0.0.0', (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`listening on http://localhost:${PORT}`)
    }
})