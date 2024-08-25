import React from 'react'
import {useEffect, useState} from 'react'

import {styled} from '@mui/material/styles'
import {alpha, AppBar, Button, Container, Dialog, Grid, InputBase, Slide, Stack} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import StorageSettings from '../Config/StorageSettings'
import SplitButton from '../../../shared/SplitButton'



const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

function CloseIcon() {return null}

export default function AppHeader({storageList, onSearch}) {

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [storage, setStorage] = useState('')
    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    useEffect(()=>{onSearch(search, storage)},[search, storage])

    return (
        <AppBar color="default" position="static">
            <Toolbar>
                <Stack sx={{flexGrow: 1}} direction="row" spacing={2}>
                    {storageList && storageList.map((obj, index)=>(
                        <SplitButton key={index}
                                     storage={storage}
                                     setStorage={setStorage}
                                     name={obj.name}/>
                        // <Button
                        //     key={index}
                        //     name={obj.name}
                        //     variant='contained'
                        //     color={storage === obj.name ? 'info' : 'inherit'}
                        //     onClick={(e)=>setStorage(e.target.name)}
                        //     disableElevation>
                        //     {obj.name}
                        // </Button>
                    ))}
                    <Button variant = 'contained'
                            color={storage === '' ? 'info' : 'inherit'}
                            name=''
                            onClick={(e)=>setStorage(e.target.name)}
                            >
                        ALL
                    </Button>
                </Stack>
                <Button onClick={handleClickOpen} variant="text" color="inherit">config</Button>
            </Toolbar>
            <Divider variant="middle"/>
            <Toolbar>
                <Stack sx={{flexGrow: 1}} direction="row" spacing={2}>
                    <Button variant="text" color="inherit">in</Button>
                    <Button variant="text" color="inherit">out</Button>
                    <Button variant="text" color="inherit">transport</Button>
                </Stack>
                <Search >
                    <SearchIconWrapper>
                        <SearchOutlinedIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                </Search>
            </Toolbar>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                           Storage Configuration
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="false" sx={{mt: 4}}>
                    <Grid container spacing={2}
                          direction="column"
                          justifyContent="flex-end"
                          alignItems="stretch"
                    >
                        <Grid item><StorageSettings /></Grid>
                    </Grid>
                </Container>
            </Dialog>
        </AppBar>
    )}
