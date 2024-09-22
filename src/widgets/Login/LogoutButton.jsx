import {Button} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import {postApiTokenLogout} from '../../API/API_FUNC.js';
import Cookies from 'js-cookie';
import {useLogin} from '../../pages/login/loginStore.js';


export default function LogoutButton () {
    const setlogoutUser = useLogin(state => state.logoutUser)
    const mutationLogout = useMutation({
        mutationFn: () => {
            return postApiTokenLogout()
        },
        onSuccess: () => {
            setlogoutUser()
            Cookies.remove('Token')
            location.reload()
        },
        onError: (error) => {
            console.log(error.response.data)
        },
    })
    const handleLogout = () => {
        mutationLogout.mutate()
    }

    return (
        <>
            <Button onClick={handleLogout} variant="text" color="inherit">Logout</Button>
        </>
    )
}