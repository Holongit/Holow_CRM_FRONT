import {useState} from 'react';

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postApiAddStorage} from '../../../../API/API_FUNC.js';

export default function AddStorage() {

    const queryClient = useQueryClient()
    const useAddStorage = useMutation({
        mutationFn: () => postApiAddStorage(newStorageData),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['storage', 'storages'])
        },
        onError: (error) => console.log(error),
    })

    const [newStorageData, setNewStorageData] = useState({
        name: '',
        location: '',
        description: ''
    })
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {setOpen(true)}
    const handleClickClose = () => {setOpen(false)}
    const handleClickAdd = (e) => {
        e.preventDefault()
        useAddStorage.mutate()
    }

    return (
        <>
            <Button variant="text" color='inherit' onClick={handleClickOpen}>
                <AddRoundedIcon fontSize='medium'/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClickClose}
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle>Add storage</DialogTitle>
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
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
