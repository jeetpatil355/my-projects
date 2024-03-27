const express = require('express')

const app = express()
app.use(express.json())

const userRouter = require('./routes/user')
const notesRouter = require('./routes/note')

app.use('/user', userRouter)
app.use('/note', notesRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
