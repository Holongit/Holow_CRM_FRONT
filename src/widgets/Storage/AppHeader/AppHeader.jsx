import {useEffect, useState} from 'react'

import {styled} from '@mui/material/styles'
import {alpha, AppBar, Button, InputBase, Stack} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import SplitButton from '../../../shared/SplitButton'
import AddStorage from '../AddStorage/AddStorage'
import ButtonConfig from '../Config/ButtonConfig';
import API_STORAGE from '../../../CONST.js';



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


export default function AppHeader({storageList, onSearch}) {


    const [search, setSearch] = useState('')
    const [storage, setStorage] = useState('')


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
                    ))}
                    <Button variant = 'contained'
                            color={storage === '' ? 'info' : 'inherit'}
                            name=''
                            onClick={(e)=>setStorage(e.target.name)}
                            >
                        ALL
                    </Button>
                    <AddStorage/>
                </Stack>
                <ButtonConfig/>
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
        </AppBar>
    )}
