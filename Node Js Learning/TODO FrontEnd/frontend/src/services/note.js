import axios from 'axios'
import { createUrl } from './utils'

export async function addNote(title, details, dueDate) {
  const url = createUrl('note/')
  const body = {
    title,
    details,
    dueDate,
  }
  try {
    const response = await axios.post(url, body, {
      headers: {
        token: sessionStorage['token'],
      },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getMyNotes() {
  const url = createUrl('note/my')

  try {
    const response = await axios.get(url, {
      headers: {
        token: sessionStorage['token'],
      },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getPublicNotes() {
  const url = createUrl('note/public')

  try {
    const response = await axios.get(url, {
      headers: {
        token: sessionStorage['token'],
      },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function deleteNote(id) {
  const url = createUrl('note/' + id)

  try {
    const response = await axios.delete(url, {
      headers: {
        token: sessionStorage['token'],
      },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function markNotePrivate(id) {
  const url = createUrl('note/private/' + id)

  try {
    const response = await axios.patch(
      url,
      {},
      {
        headers: {
          token: sessionStorage['token'],
        },
      }
    )
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function markNotePublic(id) {
  const url = createUrl('note/public/' + id)

  try {
    const response = await axios.patch(
      url,
      {},
      {
        headers: {
          token: sessionStorage['token'],
        },
      }
    )
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
