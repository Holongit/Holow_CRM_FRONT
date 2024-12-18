import {API_STORAGE, API_TOKEN_LOGIN, API_TOKEN_LOGOUT} from './API_URLS.js';


export async function postApiTokenLogin(loginData) {
    const response = await API_TOKEN_LOGIN.post('/', loginData)
    return 'Token ' + response.data.auth_token
}

export async function postApiTokenLogout() {
    return await API_TOKEN_LOGOUT.post('/')
}

export async function postApiAddStorage(data) {
    return await API_STORAGE.post('storages/', data)
}

export async function deleteApiStorage(obj) {
    const id = obj.id + '/'
    return await API_STORAGE.delete('storages/' + id)
}

export async function updateApiStorage(data, obj) {
    const id = obj.id + '/'
    return API_STORAGE.put('storages/' + id, data)
}

export async function postApiStorageDoc(data) {
    return await API_STORAGE.post('doc/', data)
}

export async function deleteApiStorageDoc(obj) {
    if (typeof obj === 'object') {
        const id = obj.id + '/'
        return await API_STORAGE.delete('doc/' + id)
    } else {
        return await API_STORAGE.delete('doc/' + obj + '/')
    }
}

export async function patchApiStorageDoc(data, obj) {
    if (typeof obj === 'object') {
        const id = obj.id + '/'
        return await API_STORAGE.patch('doc/' + id, data)
    } else {
        return await API_STORAGE.patch('doc/' + obj + '/', data)
    }
}

export async function postApiStorageDocTable(data) {
    return await API_STORAGE.post('doctable/', data)
}

export async function deleteApiStorageDocTable(obj) {
    if (typeof obj === 'object') {
        const id = obj.id + '/'
        return await API_STORAGE.delete('doctable/' + id)
    } else {
        return await API_STORAGE.delete('doctable/' + obj + '/')
    }
}

export async function postApiStorageClients(data) {
    return await API_STORAGE.post('clients/', data)
}

export async function deleteApiStorageClients(obj) {
    if (typeof obj === 'object') {
        const id = obj.id + '/'
        return await API_STORAGE.delete('clients/' + id)
    } else {
        return await API_STORAGE.delete('clients/' + obj + '/')
    }
}