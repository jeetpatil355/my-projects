const express = require('express')
const jwt = require('jsonwebtoken')
const utils = require('./utils')
const cors = require('cors')

const app = express()

// enable cors
app.use(cors())
app.use(express.json())

// middleware to verify the token
app.use((request, response, next) => {
  if (request.url == '/user/register' || request.url == '/user/login') {
    // since the user is getting registered or logged in, token wont be available
    // skip verifying the token
    next()
  } else {
    const token = request.headers['token']
    if (!token || token.length == 0) {
      response.send(utils.createError('missing token'))
      return
    }

    try {
      const payload = jwt.verify(token, '123456789')
      console.log(`payload = `, payload)

      // add the payload to the request which can be shared with
      // all the APIs called
      request.user = payload

      // call the next function
      next()
    } catch (ex) {
      console.log(ex)
      response.send(utils.createError('invalid token'))
    }
  }
})

const userRouter = require('./routes/user')
const notesRouter = require('./routes/note')

app.use('/user', userRouter)
app.use('/note', notesRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
