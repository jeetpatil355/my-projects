import axios from 'axios'

//TODO: create a configuration object to keep the url
const url = 'http://localhost:4000'

export async function getMyTodoItems() {
  try {
    const response = await axios.get(url + '/todo/item/1')
    return response.data
  } catch (ex) {
    console.log(ex)
  }
}

export async function createTodoItem(title, body) {
  try {
    const requestBody = { title, body, userId: 1 }

    //TODO: get the current user id
    const response = await axios.post(url + '/todo/item', requestBody)
    return response.data
  } catch (ex) {
    console.log(ex)
  }
}
