// import axios
import axios from 'axios'

// server url
const url = 'http://localhost:4000'

export async function loginUser(email, password) {
  // create a body
  const body = { email, password }

  // POST http://localhost:4000/user/login

  // send a POST request
  try {
    const response = await axios.post(url + '/user/login', body)

    // send the result you got in the response
    return response.data
  } catch (ex) {
    console.log(ex)
  }
}

export async function registerUser(firstName, lastName, email, password) {
  const body = {
    firstName,
    lastName,
    email,
    password,
  }

  // POST http://localhost:4000/user/register
  try {
    const response = await axios.post(url + '/user/register', body)
    return response.data
  } catch (ex) {
    console.log(ex)
  }
}
