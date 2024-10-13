import {useState} from "react";
import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import NoteAddIcon from "@mui/icons-material/NoteAdd.js";

import {useCreateStorageClients} from "../../../../API/API_HOOKS.js";

export default function CreateClient() {

    const [open, setOpen] = useState(false)
    const [clientData, setClientData] = useState({
        name: 'CRM',
        telephone: '',
        email: '',
        address: '',
    })
    const createStorageClients = useCreateStorageClients(clientData)

    const handleClickOpen = () => setOpen(true)
    const handleClickClose = () => setOpen(false)
    const handleClickAdd = (e) => {
        e.preventDefault()
        if (clientData.name.length > 2) {
            createStorageClients.mutate()
            setOpen(false)
        }
    }

    return (
        <>
            <Button variant="outlined"
                    onClick={handleClickOpen}
                    startIcon={<NoteAddIcon/>}
                    color='info'
            >
                Create
            </Button>
            <Dialog
                open={open}
                onClose={handleClickClose}
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle>Create Client</DialogTitle>
                <DialogContent>
                    <DialogContentText/>
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '29ch'},}}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            margin='dense'
                            id='name'
                            label='Name'
                            onChange={e => setClientData({...clientData, name: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='Phone'
                            label='Phone'
                            onChange={e => setClientData({...clientData, telephone: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='note'
                            label='Email'
                            multiline
                            onChange={e => setClientData({...clientData, email: e.target.value})}/>
                        <TextField
                            margin='dense'
                            id='note'
                            label='Address'
                            multiline
                            onChange={e => setClientData({...clientData, address: e.target.value})}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}