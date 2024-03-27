import axios from 'axios'
import { createUrl } from './utils'

export async function registerUser(firstName, lastName, email, password) {
  const url = createUrl('user/register')
  const body = {
    firstName,
    lastName,
    email,
    password,
  }
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function loginUser(email, password) {
  const url = createUrl('user/login')
  const body = {
    email,
    password,
  }
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
