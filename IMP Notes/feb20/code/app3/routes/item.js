const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/', async (request, response) => {
  const [result] = await db.execute(
    `select id, title, details, status from item`
  )
  response.send(utils.createSuccess(result))
})

router.post('/', async (request, response) => {
  // extracting keys from json object
  const { title, details } = request.body

  try {
    // execute SQL statement
    await db.execute('insert into item (title, details) values (?, ?)', [
      title,
      details,
    ])
    response.send(utils.createSuccess('item inserted'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

// :id represents a dynamic value
router.put('/:id', async (request, response) => {
  // read the data from url path
  const { id } = request.params

  // read the data from body
  const { title, details } = request.body

  try {
    await db.execute('update item set title = ?, details = ? where id = ?', [
      title,
      details,
      id,
    ])
    response.send(utils.createSuccess('item updated'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.delete('/:itemId', async (request, response) => {
  const { itemId } = request.params
  try {
    await db.execute('delete from item where id = ?', [itemId])
    response.send(utils.createSuccess('item deleted'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

module.exports = router
