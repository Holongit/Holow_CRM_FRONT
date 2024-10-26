import * as React from 'react'
import {useState} from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {FormControl, InputLabel, Select, Stack} from '@mui/material'
import Box from '@mui/material/Box'
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete.js";

import {
    useDeleteStorageDoc, usePatchStorageDoc,
    useStorageDocList,
    useUsersMe
} from "../../../../API/API_HOOKS.js";
import CreateDocTable from "./CreateDocTable";
import CreateInvoice from "./CreateInvoice.jsx";


export default function CreateStorageDoc() {

    const {data: storageDocList} = useStorageDocList()
    const {data: user} = useUsersMe()
    const [open, setOpen] = useState(false)
    const openDocList = storageDocList.filter((doc) => doc.status === 'open' && doc.user === user.username)
    const [openDoc, setOpenDoc] = useState('')
    const deleteSelectedInvoice = useDeleteStorageDoc(openDoc)
    const patchCloseStorageDoc = usePatchStorageDoc({status: 'close'}, openDoc)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            return
        setOpen(false)
    }

    const handleChangeOpenInvoice = (event) => {
        const selectedStorageDoc = openDocList.filter(obj => obj.id === event.target.value)
        setOpenDoc(selectedStorageDoc[0])
    }

    const handleClickAdd = async (e) => {
        e.preventDefault()
        if (openDoc !== '') {
            await patchCloseStorageDoc.mutate()
        }
            setOpenDoc('')
            setOpen(false)
    }
    const handleClickDeleteInvoice = async (e) => {
        e.preventDefault()
        const confirm = window.confirm(`Delete Invoice ${openDoc.id} ?`)
        if (openDoc.length !== 0 && confirm) {
            await deleteSelectedInvoice.mutate()
            setOpenDoc('')
        }
    }

    // console.log('openDocList: ', openDocList)
    // console.log('storageDocList: ', storageDocList)
    console.log('openDoc: ', openDoc)
    // console.log('currentStorageDoc: ', currentStorageDoc)
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
                        sx={{'& > :not(style)': {m: 1, minWidth: 450},}}
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
                                value={openDoc.id || ''}
                                label="Storage"
                                onChange={handleChangeOpenInvoice}
                            >{openDocList && openDocList
                                .map((obj, index) => (
                                    <MenuItem key={index} value={obj.id}
                                              disabled={openDocList.length === 0}>
                                        #{obj.id} {obj.storage} - {obj.user}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Stack direction="row" spacing={2} mt='10px'>
                            <CreateInvoice setOpenDoc={setOpenDoc}/>
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
                    </Box>
                    <CreateDocTable openDoc={openDoc}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
