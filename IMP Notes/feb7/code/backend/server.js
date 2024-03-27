const express = require('express')
const cors = require('cors')
const utils = require('./utils')

const users = []

const app = express()
app.use(cors('*'))
app.use(express.json())

app.post('/user/login', (request, response) => {
  const { email, password } = request.body
  const index = users.findIndex(
    (item) => item.email == email && item.password == password
  )
  if (index == -1) {
    response.send(utils.createError('user does not exist'))
  } else {
    response.send(utils.createSuccess(users[index]))
  }
})

app.post('/user/register', (request, response) => {
  const { firstName, lastName, email, password } = request.body

  const index = users.findIndex((item) => item.email == email)
  if (index != -1) {
    response.send(utils.createError('user already exists'))
  } else {
    users.push({
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
      items: [],
    })
    response.send(utils.createSuccess('done'))
  }
})

app.post('/todo/item', (request, response) => {
  const { userId, title, body } = request.body
  const index = users.findIndex((item) => item.id == userId)
  if (index == -1) {
    response.send(utils.createError('user does not exist'))
  } else {
    users[index]['items'].push({
      id: users[index]['items'].length + 1,
      title,
      body,
      completed: false,
      createdTimestamp: new Date(),
    })
    response.send(utils.createSuccess(users[index]['items']))
  }
})

app.get('/todo/item/:id', (request, response) => {
  const { id } = request.params
  const index = users.findIndex((item) => item.id == id)
  if (index == -1) {
    response.send(utils.createError('user does not exist'))
  } else {
    response.send(utils.createSuccess(users[index]['items']))
  }
})

app.delete('/todo/item/:userId/:id', (request, response) => {
  const { id, userId } = request.params
  const index = users.findIndex((item) => item.id == userId)
  if (index == -1) {
    response.send(utils.createError('user does not exist'))
  } else {
    const itemIndex = users[index]['items'].findIndex((item) => item.id == id)
    if (itemIndex == -1) {
      response.send(utils.createError('todo item does not exist'))
    } else {
      users[index]['items'].splice(itemIndex, 1)
      response.send(utils.createSuccess(users[index]['items']))
    }
  }
})

app.patch('/todo/item/:userId/:id', (request, response) => {
  const { id, userId } = request.params
  const index = users.findIndex((item) => item.id == userId)
  if (index == -1) {
    response.send(utils.createError('user does not exist'))
  } else {
    const itemIndex = users[index]['items'].findIndex((item) => item.id == id)
    if (itemIndex == -1) {
      response.send(utils.createError('todo item does not exist'))
    } else {
      users[index]['items'][itemIndex].completed = true
      response.send(utils.createSuccess(users[index]['items']))
    }
  }
})

app.get('/', (request, response) => {
  response.send('welcome to app')
})

app.listen(4000, '0.0.0.0', () => {
  console.log('server started..')
})
