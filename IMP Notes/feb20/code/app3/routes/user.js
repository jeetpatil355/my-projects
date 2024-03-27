const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.post('/register', async (request, response) => {
  const { firstName, lastName, email, password } = request.body
  try {
    await db.execute(
      `
    insert into user
        (firstName, lastName, email, password) values (?, ?, ?, ?)
    `,
      [firstName, lastName, email, password]
    )
    response.send(utils.createSuccess('user registered'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.post('/login', async (request, response) => {
  const { email, password } = request.body
  const [users] = await db.execute(
    `
        select id, firstName, lastName from user where email = ? and password = ?
    `,
    [email, password]
  )

  if (users.length == 0) {
    // there is no user with email and password
    response.send(utils.createError('Invalid email or password'))
  } else {
    // found a user matching email and password
    response.send(
      utils.createSuccess({
        user: users[0],
      })
    )
  }
})

module.exports = router
