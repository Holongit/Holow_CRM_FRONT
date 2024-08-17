import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

// eslint-disable-next-line no-undef
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const ItemButtonSX = {
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
}

const ItemIconSX = {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
}


function SideBar({handleDrawerClose, open}) {
    const theme = useTheme();

    return (

        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={ItemButtonSX}>
                        <ListItemIcon sx={ItemIconSX}>
                            <EqualizerOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Statistics'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={ItemButtonSX}>
                        <ListItemIcon sx={ItemIconSX}>
                            <WarehouseOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Storage'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={ItemButtonSX}>
                        <ListItemIcon sx={ItemIconSX}>
                            <HandymanOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Service'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={ItemButtonSX}>
                        <ListItemIcon sx={ItemIconSX}>
                            <LocalGroceryStoreOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Store'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={ItemButtonSX}>
                        <ListItemIcon sx={ItemIconSX}>
                            <MonetizationOnOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Finance'} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
        </Drawer>
    );
}

export default SideBar
