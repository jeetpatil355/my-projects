const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/my', async (request, response) => {
  try {
    const [notes] = await db.execute(
      `select id, title, details, isPublic, dueDate from note where userId = ?`,
      [request.user.id]
    )
    response.send(utils.createSuccess(notes))
  } catch (ex) {
    console.log(ex)
    response.send(utils.createError(ex))
  }
})

router.get('/public', async (request, response) => {
  try {
    const [notes] = await db.execute(
      `select id, title, details, isPublic, dueDate from note where isPublic = 1`,
      []
    )
    response.send(utils.createSuccess(notes))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.get('/search/:text', async (request, response) => {
  const { text } = request.params
  try {
    const [notes] = await db.execute(
      `select id, title, details, isPublic, dueDate from note 
       where (title LIKE = '%${text}%') or (details LIKE = '%${text}%')`,
      []
    )
    response.send(utils.createSuccess(notes))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.post('/', async (request, response) => {
  const { title, details, dueDate } = request.body

  try {
    await db.execute(
      `insert into note (title, details, dueDate, userId) values (?, ?, ?, ?)`,
      [title, details, dueDate, request.user.id]
    )
    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.put('/:id', async (request, response) => {
  const { id } = request.params
  const { title, details, dueDate } = request.body

  try {
    await db.execute(
      `update note set title = ?, details = ?, dueDate = ? where id = ? and userId = ?`,
      [title, details, dueDate, id, request.user.id]
    )
    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.patch('/private/:id', async (request, response) => {
  const { id } = request.params

  try {
    await db.execute(
      `update note set isPublic = 0 where id = ? and userId = ?`,
      [id, request.user.id]
    )
    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.patch('/public/:id', async (request, response) => {
  const { id } = request.params

  try {
    await db.execute(
      `update note set isPublic = 1 where id = ? and userId = ?`,
      [id, request.user.id]
    )
    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    await db.execute(`delete from note where id = ?`, [id])
    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

module.exports = router
