const express = require('express')
const router = express.Router()

router.post('/', (request, response) => {
  response.send('item created')
})

router.get('/', (request, response) => {
  response.send('list of items')
})

router.put('/', (request, response) => {
  response.send('item updated')
})

router.delete('/', (request, response) => {
  response.send('item deleted')
})

module.exports = router
