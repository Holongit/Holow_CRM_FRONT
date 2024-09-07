import * as React from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

import {API_STORAGE} from '../../../../CONST.js'
import EditStorage from '../EditStorage/EditStorage.jsx';


export default function SplitButton({storage, setStorage, obj}) {

    const name = obj.name
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)
    const handleToggle = () => {setOpen((prevOpen) => !prevOpen)}
    const handleMenuItemClick = () => {
            setOpen(false)
            const confirm = window.confirm('Delete Storage?')
            const id = obj.id + '/'
            if (confirm) {
                API_STORAGE
                    .delete('storages/'+ id)
                    .then(response =>{
                        console.log(response)
                        location.reload()
                    })
                    .catch(err => console.log(err))
            }
    }
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    return (
        <>
            <ButtonGroup variant="outlined" ref={anchorRef}>
                <Button name={name}
                        color={storage === name ? 'info' : 'inherit'}
                        onClick={(e)=>setStorage(e.target.name)}
                >
                    {name}
                </Button>
                <Button
                    name={name}
                    size="small"
                    color={storage === name ? 'info' : 'inherit'}
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    <MenuItem onClick={(event) => handleMenuItemClick(event)}
                                        >
                                            Delete
                                        </MenuItem>
                                    <EditStorage setOpenStorage={setOpen} obj={obj} />
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
