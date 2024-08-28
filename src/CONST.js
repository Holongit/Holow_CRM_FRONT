import axios from 'axios';

const API_STORAGE = axios.create({
    baseURL: 'http://localhost:8000/api/v1/storage/',
    timeout: 15000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})

export default API_STORAGE