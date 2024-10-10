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
    useClientsList, useCreateStorageDoc,
    useDeleteStorageDoc,
    useStorageDocList,
    useStorageList,
    useUsersMe
} from "../../../../API/API_HOOKS.js";
import MenuItem from "@mui/material/MenuItem";
import CreateDocTable from "./CreateDocTable";
import DeleteIcon from "@mui/icons-material/Delete.js";


export default function CreateStorageDoc({storage}) {
    const {data: storageList} = useStorageList()
    const {data: storageDocList} = useStorageDocList()
    const {data: clientsList} = useClientsList()
    const {data: user} = useUsersMe()
    const [open, setOpen] = useState(false)
    const [inputClientValue, setInputClientValue] = useState('')
    const [currentStorageDoc, setCurrentStorageDoc] = useState('')
    const [newStorageDoc, setNewStorageDoc] = useState({
        client: '',
        storage: '',
        user: user.username,
        type: 'coming',
        description: '',

    })
    const openDocList = storageDocList.filter((doc) => doc.status === 'open' && doc.user === user.username)
    const [openDoc, setOpenDoc] = useState('')
    const createStorageDoc = useCreateStorageDoc(newStorageDoc)
    const deleteStorageDoc = useDeleteStorageDoc(currentStorageDoc)
    const handleClickOpen = () => {
        if (storage) {
            setNewStorageDoc({...newStorageDoc, client: clientsList[0].name, storage: storage})
        } else {
            setNewStorageDoc({...newStorageDoc, client: clientsList[0].name, storage: storageList[0].name})
        }
        createStorageDoc.mutate()
        setOpen(true)
    }
    const handleClickClose = async (event, reason) => {
        const response = await createStorageDoc.data
        const currentStorageDoc = response.data
        setCurrentStorageDoc(currentStorageDoc)
        if (currentStorageDoc.status === 'open') {
            deleteStorageDoc.mutate()
        }
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

    }
    const handleChangeClients = (event, newValue) => {
        console.log(newValue)
        setNewStorageDoc({...newStorageDoc, client: newValue})

    }
    const handleClickAdd = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    const handleClickDeleteInvoice = async (e) => {
        e.preventDefault()
        const confirm = window.confirm(`Delete Invoice ${openDoc} ?`)
        if (openDoc.length !== 0 && confirm) {
            setCurrentStorageDoc(openDoc)
            deleteStorageDoc.mutate()
            setOpenDoc('')
        }
    }


    console.log('openDocList: ', openDocList)
    console.log('storageDocList: ', storageDocList)
    console.log('openDoc: ', openDoc)
    // console.log('storage: ', storage)
    // console.log('newStorageDoc: ', newStorageDoc)
    // console.log('clientsList: ', clientsList)
    // console.log('currentStorageDocID: ', currentStorageDocID)


    // useEffect(() => {
    //     if (user.username === lastDoc.user) {
    //         if (lastDoc.status === 'open') {
    //             setLastStorageDoc(lastDoc)
    //             deleteStorageDoc.mutate()
    //         }
    //     }
    // }, [lastStorageDoc])

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
                                value={openDoc}
                                label="Storage"
                                onChange={handleChangeOpenInvoice}
                            >{openDocList && openDocList
                                .map((obj, index) => {
                                    return <MenuItem key={index} value={obj.id}
                                                     disabled={openDocList.length === 0}>
                                        #{obj.id} {obj.storage} - {obj.user}
                                    </MenuItem>
                                })}
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

                        {/*<TextField*/}
                        {/*    margin='dense'*/}
                        {/*    id='note'*/}
                        {/*    label='Description'*/}
                        {/*    onChange={e => setNewStorageDoc({...newStorageDoc, description: e.target.value})}*/}
                        {/*/>*/}
                        <Autocomplete
                            value={newStorageDoc.client}
                            onChange={handleChangeClients}
                            inputValue={inputClientValue}
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
