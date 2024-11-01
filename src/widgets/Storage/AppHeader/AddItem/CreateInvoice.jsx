import {useEffect, useState} from "react";
import * as React from "react";

import {useMutation, useQueryClient} from "@tanstack/react-query";

import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd.js";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import {Autocomplete, FormControl, InputLabel, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete.js";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import {
    useClientsList, useCreateStorageClients,
    useDeleteStorageClients,
    useStorageList,
    useUsersMe
} from "../../../../API/API_HOOKS.js";
import CreateClient from "../CreateClient/CreateClient.jsx";
import {postApiStorageDoc} from "../../../../API/API_FUNC.js";


export default function CreateInvoice({setOpenDoc}) {
    const {data: storageList} = useStorageList()
    const {data: clientsList} = useClientsList()
    const {data: user} = useUsersMe()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [inputClientValue, setInputClientValue] = useState('')
    const [newStorageDoc, setNewStorageDoc] = useState({
        client: '',
        storage: '',
        user: user.username,
        type: 'coming',
        description: '',
    })
    const deleteStorageClients = useDeleteStorageClients(clientsList.filter((client) => client.name === newStorageDoc.client)[0])
    const deleteStorageDefaultClients = useDeleteStorageClients(clientsList.filter((client) => client.name === 'CRM')[0])
    const createStorageDefaultClients = useCreateStorageClients({
        name: 'CRM',
        telephone: '',
        email: '',
        address: '',
    })
    const createStorageDoc = useMutation({
        mutationFn: async () => {
            const response = await postApiStorageDoc(newStorageDoc)
            setOpenDoc(response.data)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
        onError: (error) => {
            console.log(error)
            setOpenDoc('')
        },
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
        setOpen(false)
    }
    const handleChangeStorage = (event) => {
        setNewStorageDoc({...newStorageDoc, storage: event.target.value})

    }

    const handleChangeClients = (event, newValue) => {
        setNewStorageDoc({...newStorageDoc, client: newValue})

    }

    const handleClickCreateInvoice = (e) => {
        e.preventDefault()
        if (newStorageDoc.storage.length > 0 && newStorageDoc.client !== null && newStorageDoc.client.length > 0) {
            createStorageDoc.mutate()
            setOpen(false)
        } else {
            alert('Select storage and clients')
        }
    }

    const handleClickDeleteClient = async (e) => {
        e.preventDefault()
        if (newStorageDoc.client.length > 0) {
            await deleteStorageClients.mutate()
            setNewStorageDoc({...newStorageDoc, client: ''})
        }

    }

    useEffect(() => {
        const CRM = clientsList.filter((client) => client.name === 'CRM')
        if (clientsList.length === 0) {
            createStorageDefaultClients.mutate()
        }
        if (clientsList.length >= 2 && CRM.length > 0) {
            deleteStorageDefaultClients.mutate()
        }
    }, [])

    // console.log('newStorageDoc: ', newStorageDoc)

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
                maxWidth='lg'
                fullWidth={true}
            >
                <DialogTitle>Create Invoice</DialogTitle>
                <DialogContent>
                    <DialogContentText/>
                    <Box
                        marginBottom={2}
                        component="form"
                        sx={{'& > :not(style)': {m: 1, minWidth: 450},}}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl>
                            <InputLabel id="StorageSelectInputId">Storage</InputLabel>
                            <Select
                                labelId="StorageSelectLabelId"
                                id="StorageSelectId"
                                value={newStorageDoc.storage || ''}
                                label="Storage"
                                onChange={handleChangeStorage}
                            >{storageList && storageList.map((obj, index) => {
                                return <MenuItem key={index} value={obj.name}>{obj.name}</MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        <TextField
                            margin='dense'
                            id='note'
                            label='Description'
                            value={newStorageDoc.description || ''}
                            onChange={e => setNewStorageDoc({...newStorageDoc, description: e.target.value})}
                        />
                        <Autocomplete
                            value={newStorageDoc.client || null}
                            onChange={handleChangeClients}
                            inputValue={inputClientValue}
                            // isOptionEqualToValue={(opt, val) => opt === "TEST"}
                            onInputChange={(event, newInputValue) => setInputClientValue(newInputValue)}
                            id="ClientSelect"
                            options={clientsList && clientsList.map(option => option.name)}
                            sx={{width: 300}}
                            renderOption={(props, option) => {
                                const {key, ...optionProps} = props
                                return (
                                    <Box key={key} component="li" {...optionProps}>
                                        {option}
                                    </Box>
                                )
                            }}
                            renderInput={(params) =>
                                <TextField
                                    margin='dense' {...params}
                                    label="Supplier"
                                />
                            }
                        />
                        <Stack direction="row" spacing={2} mt='10px'>
                            <CreateClient newStorageDoc={newStorageDoc} setNewStorageDoc={setNewStorageDoc}/>
                            <Button variant="outlined"
                                    onClick={handleClickDeleteClient}
                                    startIcon={<DeleteIcon/>}
                                    color='error'
                                    disabled={clientsList.length === 1}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickCreateInvoice}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}