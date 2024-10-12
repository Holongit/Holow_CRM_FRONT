import * as React from 'react'
import {useState} from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {Autocomplete, FormControl, InputLabel, Select, Stack, TextField} from '@mui/material'
import Box from '@mui/material/Box'

import {
    useClientsList,
    useDeleteStorageDoc,
    useStorageDocList,
    useStorageList,
    useUsersMe
} from "../../../../API/API_HOOKS.js";
import MenuItem from "@mui/material/MenuItem";
import CreateDocTable from "./CreateDocTable";
import DeleteIcon from "@mui/icons-material/Delete.js";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postApiStorageDoc} from "../../../../API/API_FUNC.js";


export default function CreateStorageDoc({storage}) {

    const {data: storageList} = useStorageList()
    const {data: storageDocList} = useStorageDocList()
    const {data: clientsList} = useClientsList()
    const {data: user} = useUsersMe()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [inputClientValue, setInputClientValue] = useState('')
    const openDocList = storageDocList.filter((doc) => doc.status === 'open' && doc.user === user.username)
    const [currentStorageDoc, setCurrentStorageDoc] = useState('')
    const [openDoc, setOpenDoc] = useState('')
    const [newStorageDoc, setNewStorageDoc] = useState({
        client: '',
        storage: '',
        user: user.username,
        type: 'coming',
        description: '',
    })
    const deleteSelectedInvoice = useDeleteStorageDoc(openDoc)
    const createStorageDoc = useMutation({
        mutationFn: async () => {
            const response = await postApiStorageDoc(newStorageDoc)
            console.log('mutationFn', response)
            setCurrentStorageDoc(response.data)
            setOpenDoc(response.data)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['storage', 'doc']}),
        onError: (error) => {
            console.log(error)
            setCurrentStorageDoc([])
            setOpenDoc('')
        },
    })

    const handleClickOpen = () => {
        if (openDocList.length === 0) {
            if (storage) {
                setNewStorageDoc({...newStorageDoc, client: clientsList[0].name, storage: storage})
            }
            if (!storage) {
                setNewStorageDoc({...newStorageDoc, client: clientsList[0].name, storage: storageList[0].name})
            }
            createStorageDoc.mutate()
        }
        if (openDocList.length !== 0) {
            const lastOpenDoc = openDocList[openDocList.length - 1]
            setNewStorageDoc({
                ...newStorageDoc,
                client: lastOpenDoc.client,
                storage: lastOpenDoc.storage,
                description: lastOpenDoc.description,
            })
            setCurrentStorageDoc(lastOpenDoc)
            setOpenDoc(lastOpenDoc)
        }
        setOpen(true)
    }
    const handleClickClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            return
        setOpenDoc('')
        setOpen(false)
    }
    const handleChangeStorage = (event) => {
        setNewStorageDoc({...newStorageDoc, storage: event.target.value})

    }
    const handleChangeOpenInvoice = (event) => {
        setOpenDoc(event.target.value)
        setNewStorageDoc(event.target.value)
    }
    const handleChangeClients = (event, newValue) => {
        setNewStorageDoc({...newStorageDoc, client: newValue})

    }
    const handleClickAdd = (e) => {
        e.preventDefault()
        setOpen(false)
    }
    const handleClickDeleteInvoice = async (e) => {
        e.preventDefault()
        const confirm = window.confirm(`Delete Invoice ${openDoc.id} ?`)
        if (openDoc.length !== 0 && confirm) {
            await deleteSelectedInvoice.mutate()
            setNewStorageDoc({...newStorageDoc, description: '', storage: '', client: ''})
            setOpenDoc('')
            setCurrentStorageDoc('')
        }
    }
    const handleClickCreateInvoice = (e) => {
        e.preventDefault()
        if (newStorageDoc.storage.length > 0 && newStorageDoc.client !== null && newStorageDoc.client.length > 0) {
            createStorageDoc.mutate()
        } else { alert('Select storage and clients')}
    }
    // console.log('openDocList: ', openDocList)
    // console.log('storageDocList: ', storageDocList)
    console.log('openDoc: ', openDoc)
    console.log('currentStorageDoc: ', currentStorageDoc)
    // console.log('newStorageDoc: ', newStorageDoc)
    // console.log('clientsList: ', clientsList)
    // console.log('currentStorageDocID: ', currentStorageDocID)
    return (
        <>
            <Button variant="text" color='inherit' onClick={handleClickOpen}>
                AddItem
            </Button>
            <Dialog
                open={open}
                onClose={handleClickClose}
                maxWidth='xl'
                fullWidth={true}
            >
                <DialogTitle>Income</DialogTitle>
                <DialogContent>
                    <DialogContentText/>
                    <Box
                        marginBottom={2}
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: 400},}}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl>
                            <InputLabel
                                id="OpenInvoiceInputId"
                            >
                                Invoice
                            </InputLabel>
                            <Select
                                disabled={openDocList.length === 0}
                                labelId="OpenInvoiceLabelId"
                                id="OpenInvoiceId"
                                value={openDoc || ''}
                                label="Storage"
                                onChange={handleChangeOpenInvoice}
                            >{openDocList && openDocList
                                .map((obj, index) => (
                                    <MenuItem key={index} value={obj}
                                              disabled={openDocList.length === 0}>
                                        #{obj.id} {obj.storage} - {obj.user}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Stack direction="row" spacing={2} mt='10px'>
                                <Button variant="outlined"
                                        onClick={handleClickDeleteInvoice}
                                        startIcon={<DeleteIcon/>}
                                        color='error'
                                        disabled={openDoc.length === 0}
                                >
                                    Delete
                                </Button>
                                <Button variant="outlined"
                                        onClick={handleClickCreateInvoice}
                                        startIcon={<NoteAddIcon/>}
                                        color='info'
                                >
                                    Create
                                </Button>
                            </Stack>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="StorageSelectInputId">Storage</InputLabel>
                            <Select
                                labelId="StorageSelectLabelId"
                                id="StorageSelectId"
                                value={newStorageDoc.storage}
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
                            value={newStorageDoc.description}
                            onChange={e => setNewStorageDoc({...newStorageDoc, description: e.target.value})}
                        />
                        <Autocomplete
                            value={newStorageDoc.client}
                            onChange={handleChangeClients}
                            inputValue={inputClientValue || ''}
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
                    </Box>
                    <CreateDocTable/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
