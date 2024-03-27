const express = require('express')
const db = require('../db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (request, response) => {
  const { firstName, lastName, email, password } = request.body

  try {
    // encrypt the password
    const encryptedPassword = String(cryptoJs.SHA256(password))

    await db.execute(
      `insert into user (firstName, lastName, email, password) values (?, ?, ?, ?)`,
      [firstName, lastName, email, encryptedPassword]
    )

    response.send(utils.createSuccess('done'))
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

router.post('/login', async (request, response) => {
  const { email, password } = request.body

  try {
    // encrypt the password
    const encryptedPassword = String(cryptoJs.SHA256(password))

    const [users] = await db.execute(
      `select id, firstName, lastName from user where email = ? and password = ?`,
      [email, encryptedPassword]
    )

    if (users.length == 0) {
      response.send(utils.createError('user does not exist'))
    } else {
      // get the user details
      const user = users[0]

      // create a payload
      const payload = {
        id: user['id'],
        email,
      }

      // create a token
      const token = jwt.sign(payload, '123456789')
      response.send(
        utils.createSuccess({
          firstName: user['firstName'],
          lastName: user['lastName'],
          token,
        })
      )
    }
  } catch (ex) {
    response.send(utils.createError(ex))
  }
})

module.exports = router
