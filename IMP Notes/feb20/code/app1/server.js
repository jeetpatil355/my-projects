// import express
const express = require('express')

// create an express application
const app = express()

// route: mapping of http method and url (path)
app.get('/', (request, response) => {
  console.log(`received a GET / request`)
  response.end('welcome to express')
})

app.post('/', (request, response) => {
  response.send('this is POST /')
})

app.put('/', (request, response) => {
  response.send('this is PUT /')
})

app.delete('/', (request, response) => {
  response.send('this is DELETE /')
})

// user related routes
app.get('/user', (request, response) => {
  response.end('list of users')
})

app.post('/user', (request, response) => {
  response.send('new user inserted')
})

app.put('/user', (request, response) => {
  response.send('user updated')
})

app.delete('/user', (request, response) => {
  response.send('user deleted')
})

// listen on a port
app.listen(4000, '0.0.0.0', (error) => {
  if (error) {
    console.log(`error while starting server: `, error)
  } else {
    console.log(`server started listening on port 4000`)
  }
})
