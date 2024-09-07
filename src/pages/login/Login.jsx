import {Card, CardContent, CardHeader, CardMedia, Grid, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {API_TOKEN_LOGIN} from '../../CONST.js';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [token, setToken] = useState('')
    const navigate = useNavigate()
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
                localStorage.setItem('token', token)
                navigate('/')
                location.reload()
            })
            .catch(error => console.log(error.message + ' ' + error.code))
    }, [token])
    const handleClick = (e) => {
        e.preventDefault()
        const data = JSON.stringify(loginData)
        API_TOKEN_LOGIN
            .post('', data)
            .then(response => {
                setToken('Token ' + JSON.parse(response.request.response).auth_token)
            })
            .catch(error => console.log(error.message + ' ' + error.code))
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
                                       sx={{margin: '10px'}} label='Username'/>
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
        </>
    )
}

export default Login