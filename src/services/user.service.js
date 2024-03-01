import { httpService } from "./http.service"

const AUTH_URL = 'auth/'
const USER_URL = 'user/'
const STORAGE_KEY = 'loggedInUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    update,
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

async function login({ username, password }) {

    try {
        const user = await httpService.post(AUTH_URL + 'login', { username, password })
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    }
    catch (err) {
        throw err
    }
}

async function signup(credentials) {

    try {
        const newUser = await httpService.post(AUTH_URL + 'signup', credentials)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
        return newUser
    }
    catch (err) {
        throw err
    }
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    return httpService.post(AUTH_URL + 'logout')
}

async function update(credentials) {
    try {
        const user = await httpService.put(USER_URL + credentials._id, credentials)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        throw err
    }
}

function remove(userId) {
    httpService.delete(USER_URL + userId)
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

function getEmptyCredentials(email = '', imgUrl = "", username = '', password = '', stations = [], favorites = [], friends = []) {
    return {
        email,
        username,
        password,
        stations,
        imgUrl,
        favorites,
        friends
    }
}
