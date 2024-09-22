import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Card, CardContent, CardHeader, CardMedia, Grid, TextField} from '@mui/material';

import LoginButton from '../../widgets/Login/LoginButton.jsx';


function Login() {
    const [loginData, setLoginData] = useState({
        password: '',
        username: '',
    })

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
                            <TextField type='password' onChange={e => setLoginData({...loginData, password: e.target.value})}
                                       sx={{margin: '10px'}} label='Password'/>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Grid container justifyContent='center'>
                            <LoginButton loginData={loginData}/>
                            <Button sx={{margin: '10px'}}
                                    size='medium'
                                    variant='outlined'
                                    title='Registration'>Registration
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default Login
