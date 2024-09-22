import {useMutation, useQuery} from '@tanstack/react-query';
import {postApiTokenLogin, postApiTokenLogout} from './API_QUERYS.js';
import {useLogin} from '../pages/login/loginStore.js';
import {API_USERS_ME} from './API_URLS.js';


export const useUsersMe = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: async () => {
            const users = await API_USERS_ME.get('/')
            return users.data
        },
        queryKey: ['users', 'me'],
        retry: 0,
        enabled: userLogined,
    })
}

export function useTokenLogin() {
    useMutation({
        mutationFn: (loginData) => {
            return postApiTokenLogin(loginData)
        },
    })
}

export const useTokenLogout = () => {
    const userLogined = useLogin(state => state.logined)
    return useQuery({
        queryFn: () => postApiTokenLogout(),
        queryKey: ['token', 'logout'],
        retry: 0,
        enabled: userLogined,
    })
}