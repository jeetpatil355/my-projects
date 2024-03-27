const express = require('express')

// get the global express router
const router = express.Router()

router.post('/register', (request, response) => {
  console.log(`/user/register called`)
  response.send('user registered')
})

router.post('/login', (request, response) => {
  response.send('user logged in')
})

router.put('/', (request, response) => {
  response.send('user updated')
})

router.delete('/', (request, response) => {
  response.send('user deleted')
})

// export the router
module.exports = router
