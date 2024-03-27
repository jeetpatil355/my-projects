import axios from 'axios'
import { createUrl } from './utils'

export async function registerUser(firstName, lastName, email,phone_number, password, confirmPassword) {
    const url = createUrl('user/register')
    const body = {firstName, lastName, email,phone_number, password, confirmPassword}
    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
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
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function changePasswordUser(newPassword, confirmPassword) {
    const url = createUrl('user/change-password')
    const body = {
        newPassword,
        confirmPassword,
    }
    try {
        const response = await axios.put(url, body, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getUserDetails() {
    const url = createUrl('user/get-details')

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getSpecificUserName(id) {
    const url = createUrl('user/get-single-user/'+id)

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getUsers() {
    const url = createUrl('user/get-users')

    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        })
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}

export async function getSearchMyUsers(text) {
    const url = createUrl('user/search-user/' + text)
    try {
        const response = await axios.get(url, {
            headers: {
                token: localStorage['token'],
            },
        });
        return response.data
    } catch (err) {
        return { status: 'error', error: err }
    }
}