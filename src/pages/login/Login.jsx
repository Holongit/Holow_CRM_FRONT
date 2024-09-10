import {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Alert, AlertTitle, Card, CardContent, CardHeader, CardMedia, Grid, Snackbar, TextField} from '@mui/material';
import Cookies from 'js-cookie'

import {API_TOKEN_LOGIN} from '../../CONST.js';


function Login() {
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loginData, setLoginData] = useState({
        password: '',
        username: '',
    })

    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'http://localhost:8000/api/v1/auth/users/me/',
            timeout: 2000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            withCredentials: true,
            xsrfHeaderName: "X-CSRFTOKEN",
            xsrfCookieName: "csrftoken",
        })
            .then(response => {
                const user = response.request.response
                localStorage.setItem('user', user)
                Cookies.set('Token', token, {expires: 7})
                navigate('/')
                location.reload()
            })
            .catch(error => console.log(error.message + ' ' + error.code))
    }, [token])

    const handleClick = (e) => {
        e.preventDefault()
        API_TOKEN_LOGIN
            .post('', loginData)
            .then(response => {
                setToken('Token ' + response.data.auth_token)
            })
            .catch(error => {
                console.log(error.message + ' ' + error.code)
                if (error.response.data.password || error.response.data.username) {
                setError('Username and password cannot be empty')
                }
                if (error.response.data.non_field_errors) {
                    setError('Incorrect username or password')
                }
                setOpenSnackbar(true)
            })
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
                            <Button sx={{margin: '10px'}} variant='outlined' title='Login'
                                    onClick={handleClick}>Login</Button>
                            <Button sx={{margin: '10px'}} variant='outlined' title='Registration'>Registration</Button>
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
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login