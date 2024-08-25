import {AppBar, Button, List, ListItem, ListItemButton, ListItemIcon, Tooltip} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined.js';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined.js';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined.js';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined.js';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined.js';
import {Link, Outlet} from 'react-router-dom'
import {useState} from 'react';



const ItemButtonSX = {
    minHeight: 48,
    justifyContent: 'center',
    px: 1.6,
}

const ItemIconSX = {
    minWidth: 0,
    mr: 'auto',
    justifyContent: 'center',
}

function Layout() {
   const [selected, setSelected] = useState('Statistics')

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                    >
                        Holow_CRM
                    </IconButton>
                    <Typography sx={{flexGrow: 1}} variant="h6" noWrap component="div"/>
                    <Button variant="text" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{
                mt: 7,
                boxShadow: 4,
                minWidth: 'auto',
                minHeight: '92vh',
            }}>
                <List>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <Link to='/statistics'>
                            <Tooltip title='Statistics' placement='right'>
                                <ListItemButton onClick={e => setSelected('Statistics')} selected={ selected === 'Statistics' ? true : false } sx={ItemButtonSX}>
                                    <ListItemIcon sx={ItemIconSX}>
                                        <EqualizerOutlinedIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <Link to='/'>
                            <Tooltip title='Storage' placement='right'>
                                <ListItemButton onClick={e => setSelected('Storage')} selected={ selected === 'Storage' ? true : false }  sx={ItemButtonSX}>
                                    <ListItemIcon sx={ItemIconSX}>
                                        <WarehouseOutlinedIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <Link to='/service'>
                            <Tooltip title='Service' placement='right'>
                                <ListItemButton onClick={e => setSelected('Service')} selected={selected === 'Service' ? true : false } sx={ItemButtonSX}>
                                    <ListItemIcon sx={ItemIconSX}>
                                        <HandymanOutlinedIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <Link to='/store'>
                            <Tooltip title='Store' placement='right'>
                                <ListItemButton onClick={e => setSelected('Store')} selected={selected === 'Store' ? true : false } sx={ItemButtonSX}>
                                    <ListItemIcon sx={ItemIconSX}>
                                        <LocalGroceryStoreOutlinedIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <Link to='/finance'>
                            <Tooltip title='Finance' placement='right'>
                                <ListItemButton onClick={e => setSelected('Finance')} selected={selected === 'Finance' ? true : false } sx={ItemButtonSX}>
                                    <ListItemIcon sx={ItemIconSX}>
                                        <MonetizationOnOutlinedIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </Tooltip>
                        </Link>
                    </ListItem>
                </List>
            </Box>
            <Outlet/>
            <AppBar position="fixed" color="inherit" sx={{top: 'auto', bottom: 0}}>
                <Toolbar>
                    <Typography sx={{flexGrow: 1}} variant="h6" noWrap component="div"/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Layout