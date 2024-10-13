import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {useLogin} from '../pages/login/loginStore.js';
import {API_STORAGE, API_USERS_ME} from './API_URLS.js';
import {
    deleteApiStorage, deleteApiStorageClients,
    deleteApiStorageDoc, deleteApiStorageDocTable, patchApiStorageDoc,
    postApiAddStorage, postApiStorageClients,
    postApiStorageDoc, postApiStorageDocTable,
    updateApiStorage,
} from "./API_FUNC.js";


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
        initialData: [],
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
        initialData: [],
        enabled: userLogined,
    })
}

export const useStorageDocTableList = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const response = await API_STORAGE.get('doctable/')
            return response.data.results
        },
        queryKey: ['storage', 'doctable'],
        retry: 0,
        initialData: [],
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
    return useMutation({
        mutationFn: () => updateApiStorage(newStorageData, obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
    })
}

export const useAddStorage = (storageData) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => postApiAddStorage(storageData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
    })
}

export const useDeleteStorage = (obj) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteApiStorage(obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'storages']}),
        onError: (error) => console.log(error),
    })
}

export const useCreateStorageDoc = (newStorageDoc) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => postApiStorageDoc(newStorageDoc),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
        onError: (error) => console.log(error),
    })
}

export const useDeleteStorageDoc = (obj) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteApiStorageDoc(obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
        onError: (error) => console.log(error),
    })
}

export const useCreateStorageDocTable = (newStorageDocTable) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => postApiStorageDocTable(newStorageDocTable),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doctable']}),
        onError: (error) => console.log(error),
    })
}

export const useDeleteStorageDocTable = (obj) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteApiStorageDocTable(obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doctable']}),
        onError: (error) => console.log(error),
    })
}

export const usePatchStorageDoc = (newDocData, obj) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => patchApiStorageDoc(newDocData, obj),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({queryKey: ['storage', 'remains']}),
            queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
            queryClient.invalidateQueries({queryKey: ['storage', 'doctable']}),
        ]),
        onError: (error) => console.log(error),
    })
}

export const useCreateStorageClients = (newClientData) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => postApiStorageClients(newClientData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'clients']}),
        onError: (error) => console.log(error),
    })
}

export const useDeleteStorageClients = (obj) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteApiStorageClients(obj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'clients']}),
        onError: (error) => console.log(error),
    })
}