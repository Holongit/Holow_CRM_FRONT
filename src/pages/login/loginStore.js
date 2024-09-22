import { create } from 'zustand'
import {devtools, persist} from 'zustand/middleware';


export const useLogin = create(devtools(persist(set => ({
        logined: false,
        loginUser: () => set({logined: true}),
        logoutUser: () => set({logined: false}),
    }),
    {
        name: 'user-logined',
    }
)))
