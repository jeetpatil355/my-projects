const express = require('express')

const app = express()

// app uses router
// routing table
// method   url               function reference
// POST     /user/register    0x1231223334
// GET      /item             0x5623435235

// add middlewares
app.use((request, response, next) => {
  console.log(`middleware 1 called`)

  // call the next function
  next()
})

app.use((request, response, next) => {
  console.log(`middleware 2 called`)

  // call the next function
  next()
})

app.use((request, response, next) => {
  console.log(`middleware 3 called`)

  // call the next function
  next()
})

// load routers
const userRouter = require('./routes/user')
const itemRouter = require('./routes/item')
const categoryRouter = require('./routes/category')

// add routers
app.use('/user', userRouter)
app.use('/item', itemRouter)
app.use('/category', categoryRouter)

app.listen(4000, '0.0.0.0', (error) => {
  console.log('server started on port 4000')
})
