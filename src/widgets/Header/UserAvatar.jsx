import {useState} from 'react';

import {Menu, Tooltip} from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import LogoutButton from '../Login/LogoutButton';


export default function UserAvatar({user}) {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return (
        <>
            <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        color="inherit"
                        edge="start"
                    >
                        {user.username}
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '35px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{textAlign: 'center'}}><LogoutButton/></Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    )
}
