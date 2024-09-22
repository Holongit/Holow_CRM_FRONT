import {API_TOKEN_LOGIN, API_TOKEN_LOGOUT} from './API_URLS.js';


export async function postApiTokenLogin(loginData) {
    const response = await API_TOKEN_LOGIN.post('/', loginData)
    return 'Token ' + response.data.auth_token
}

export async function postApiTokenLogout() {
    return await API_TOKEN_LOGOUT.post('/')
}