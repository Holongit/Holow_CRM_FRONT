import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {useLogin} from '../pages/login/loginStore.js';
import {API_STORAGE, API_USERS_ME} from './API_URLS.js';
import {deleteApiStorage, postApiAddStorage, postApiStorageDoc, updateApiStorage} from "./API_FUNC.js";


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

export const useStorageUpdate = (newStorageData, obj) => {
    const queryClient = useQueryClient()
    const userLogined = useLogin(state => state.logined)
    return useMutation({
        mutationFn: () => updateApiStorage(newStorageData, obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
        enabled: userLogined,
    })
}

export const useAddStorage = (storageData) => {
    const queryClient = useQueryClient()
    const userLogined = useLogin(state => state.logined)
    return useMutation({
        mutationFn: () => postApiAddStorage(storageData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
        enabled: userLogined,
    })
}

export const useDeleteStorage = (obj) => {
    const userLogined = useLogin(state => state.logined)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteApiStorage(obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
        enabled: userLogined,
    })
}

export const useCreateStorageDoc = (newStorageDoc) => {
    const userLogined = useLogin(state => state.logined)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => postApiStorageDoc(newStorageDoc),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
        onError: (error) => console.log(error),
        enabled: userLogined,
    })
}
