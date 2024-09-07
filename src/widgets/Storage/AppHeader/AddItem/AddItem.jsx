import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {TextField} from '@mui/material'
import {useState} from 'react'
import Box from '@mui/material/Box'

import {API_STORAGE} from '../../../../CONST.js'

export default function AddItem({clientsList, storageDocList}) {

    const [newStorageDoc, setnewStorageDoc] = useState({
        client: '',
        storage: '',
        user: '',
        type: '',
        description: '',

    })
    const [usersId, setUsersId] = useState({})
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)

    }
    const handleClose = () => {setOpen(false)}
    const handleAdd = (e) => {
        e.preventDefault()
        const data = JSON.stringify(newStorageData)
        console.log(newStorageData)
        console.log(data)
        API_STORAGE
            .post('storages/', data)
            .then(response => {
                console.log(response.data.results)
                handleClose()
                location.reload()
            })
            .catch(error => console.log(error.message + ' ' + error.code))
    }

    return (
        <React.Fragment>
            <Button variant="text" color='inherit' onClick={handleClickOpen}>
                AddItem
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle>Income</DialogTitle>
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
                            onChange={e=>setNewStorageData({...newStorageData, name: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='location'
                            label='Location'
                            onChange={e=>setNewStorageData({...newStorageData, location: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='note'
                            label='Description'
                            onChange={e=>setNewStorageData({...newStorageData, description: e.target.value})}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
