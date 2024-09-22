import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {Alert, AlertTitle, CircularProgress, Snackbar} from '@mui/material';
import Button from '@mui/material/Button';

import {postApiTokenLogin} from '../../API/API_FUNC.js';
import {useLogin} from '../../pages/login/loginStore.js';


export default function LoginButton({loginData}) {
    const setLoginUser = useLogin(state => state.loginUser)
    const setlogoutUser = useLogin(state => state.logoutUser)
    const [errorResponse, setErrorResponse] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const mutationLogin = useMutation({
        mutationFn: () => {
            return postApiTokenLogin(loginData)
        },
        onSuccess: data => {
            Cookies.set('Token', data, {expires: 7})
            setLoginUser()
            location.reload()
        },
        onError: error => {
            setlogoutUser()
            const errorData = error.response.data
            if (errorData.password || errorData.username) {
                setErrorResponse('Username or password cannot be empty')
            }
            if (errorData.non_field_errors) {
                setErrorResponse('Incorrect username or password')
            }
            setOpenSnackbar(true)
        }
    })
    const handleClick = (e) => {
        e.preventDefault()
        mutationLogin.mutate()
    }

    return (
        <>
            {mutationLogin.isPending
                ? <Button sx={{margin: '10px'}}
                          variant='outlined'
                          title='Login'
                          disabled
                          size='medium'
                          onClick={handleClick}>
                    <CircularProgress color='inherit' size={25}/>
                </Button>
                : <Button sx={{margin: '10px'}}
                          variant='outlined'
                          title='Login'
                          size='medium'
                          onClick={handleClick}>
                    Login
                </Button>}
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                autoHideDuration={5000}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="error"
                    sx={{width: '100%'}}
                    elevation={1}
                >
                    <AlertTitle>Error</AlertTitle>
                    {errorResponse}
                </Alert>
            </Snackbar>
        </>
    )
}