import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {TextField} from '@mui/material';
import {useState} from 'react';
import Box from '@mui/material/Box';

import {API_STORAGE} from '../../../../CONST.js';
import MenuItem from '@mui/material/MenuItem';

export default function EditStorage({setOpenStorage, obj}) {

    const [newStorageData, setNewStorageData] = useState({
        name: obj.name,
        location: obj.location,
        description: obj.description,
    })
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {
        setOpen(false)
        setOpenStorage(false)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        const id = obj.id + '/'
        const data = JSON.stringify(newStorageData)
        API_STORAGE
            .put('storages/'+ id, data)
            .then(response => {
                console.log(response.data.results)
                handleClose()
                location.reload()
            })
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            <MenuItem onClick={handleClickOpen}>
                Edit
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle>Edit storage</DialogTitle>
                <DialogContent>
                    <DialogContentText/>
                    <Box
                        component="form"
                        sx={{'& > :not(style)': { m: 1, width: '29ch' },}}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            margin='dense'
                            id='name'
                            label='Name'
                            defaultValue={obj.name}
                            onChange={e=>setNewStorageData({...newStorageData, name: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='location'
                            label='Location'
                            defaultValue={obj.location}
                            onChange={e=>setNewStorageData({...newStorageData, location: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='note'
                            label='Description'
                            defaultValue={obj.description}
                            onChange={e=>setNewStorageData({...newStorageData, description: e.target.value})}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
