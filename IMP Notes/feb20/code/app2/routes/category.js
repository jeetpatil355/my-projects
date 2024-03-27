const express = require('express')
const router = express.Router()

router.post('/', (request, response) => {
  response.send('category created')
})

router.get('/', (request, response) => {
  response.send('list of categories')
})

router.put('/', (request, response) => {
  response.send('category updated')
})

router.delete('/', (request, response) => {
  response.send('category deleted')
})

module.exports = router
