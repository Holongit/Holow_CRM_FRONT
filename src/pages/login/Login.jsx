import {Card, CardContent, CardHeader, CardMedia, Grid, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {API_TOKEN_LOGIN} from '../../CONST.js';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


function Login() {


    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        password: '',
        username: '',
    })
    const handleClick = (e) => {
        e.preventDefault()
        const data = JSON.stringify(loginData)
        API_TOKEN_LOGIN
            .post('', data)
            .then(response => {
                const token = 'Token ' + JSON.parse(response.request.response).auth_token
                const user = JSON.stringify({...loginData, token: {token}})
                localStorage.setItem('user', user)
                localStorage.setItem('token', token)
                navigate('/')
                location.reload()
            })
            .catch(error => console.log(error.request))
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