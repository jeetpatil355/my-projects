const express = require('express')

const app = express()

// add body json parser
// this parser parses the json content(s) from request and add them
// to the request.body parameter
app.use(express.json())

// add the routes
const itemRouter = require('./routes/item')
const userRouter = require('./routes/user')

app.use('/item', itemRouter)
app.use('/user', userRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
