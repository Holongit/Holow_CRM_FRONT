import axios from 'axios'
import Cookies from 'js-cookie'


const TOKEN = Cookies.get('Token')

export const API_STORAGE = axios.create({
    baseURL: 'http://localhost:8000/api/v1/storage/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN,
    },
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})

export const API_TOKEN_LOGIN = axios.create({
    baseURL: 'http://localhost:8000/auth/token/login/',
    timeout: 2000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})

export const API_TOKEN_LOGOUT = axios.create({
    baseURL: 'http://localhost:8000/auth/token/logout/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN,
    },
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})

export const API_USERS = axios.create({
    baseURL: 'http://localhost:8000/api/v1/auth/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN,
    },
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})
