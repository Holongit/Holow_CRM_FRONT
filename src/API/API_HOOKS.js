import {useQuery} from '@tanstack/react-query';

import {useLogin} from '../pages/login/loginStore.js';
import {API_STORAGE, API_USERS_ME} from './API_URLS.js';


export const useUsersMe = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_USERS_ME.get('/')
            return response.data
        },
        queryKey: ['users', 'me'],
        retry: 0,
        enabled: userLogined,
    })
}

export const useGoodsList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('goods/')
            return response.data.results
        },
        queryKey: ['storage', 'goods'],
        retry: 0,
        enabled: userLogined,
    })
}

export const useStorageList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('storages/')
            return response.data.results
        },
        queryKey: ['storage', 'storages'],
        retry: 0,
        enabled: userLogined,
    })
}

export const useStorageDocList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('doc/')
            return response.data.results
        },
        queryKey: ['storage', 'doc'],
        retry: 0,
        enabled: userLogined,
    })
}

export const useClientsList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('clients/')
            return response.data.results
        },
        queryKey: ['storage', 'clients'],
        retry: 0,
        enabled: userLogined,
    })
}

export const useRemainsList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('remains/')
            return response.data.results
        },
        queryKey: ['storage', 'remains'],
        retry: 0,
        enabled: userLogined,
    })
}



