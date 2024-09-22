import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    Alert,
    AlertTitle,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Grid,
    Snackbar,
    TextField
} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import Cookies from 'js-cookie';

import {useLogin} from './loginStore.js';
import {postApiTokenLogin} from '../../API/API_QUERYS.js';


function Login() {
    const setLoginUser = useLogin(state => state.loginUser)
    const setlogoutUser = useLogin(state => state.logoutUser)
    const [errorResponse, setErrorResponse] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loginData, setLoginData] = useState({
        password: '',
        username: '',
    })

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
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="100vh"
                 sx={{backgroundColor: '#e3eefa', margin: '-8px'}}
            >
                <Card sx={{maxWidth: 345}}>
                    <CardHeader title='Login' subheader='Holow_CRM'></CardHeader>
                    <CardMedia>
                        <Grid container justifyContent='center'>
                            <TextField onChange={e => setLoginData({...loginData, username: e.target.value})}
                                       sx={{margin: '10px'}} label='Username' autoFocus={true}/>
                            <TextField onChange={e => setLoginData({...loginData, password: e.target.value})}
                                       sx={{margin: '10px'}} label='Password'/>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Grid container justifyContent='center'>
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
                            <Button sx={{margin: '10px'}}
                                    size='medium'
                                    variant='outlined'
                                    title='Registration'>Registration
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
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

export default Login
