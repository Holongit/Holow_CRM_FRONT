import {createContext, useState} from 'react';

export const CustomContext = createContext('check provider')

export const Context = (props) => {

    const [user, setUser] = useState({
        password: '',
        username: '',
        token: '',
    })

    const value = {
        user,
        setUser,
    }

    return (
        <CustomContext.Provider value={value}>
            {props.children}
        </CustomContext.Provider>
    )
}