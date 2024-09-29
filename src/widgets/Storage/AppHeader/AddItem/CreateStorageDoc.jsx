import * as React from 'react'
import {useEffect, useState} from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {Autocomplete, FormControl, InputLabel, Select, TextField} from '@mui/material'
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


export default function CreateStorageDoc() {

    const {data: storageList} = useStorageList()
    const {data: storageDocList} = useStorageDocList()
    const {data: clientsList} = useClientsList()
    const {data: user} = useUsersMe()
    const [lastStorageDoc, setLastStorageDoc] = useState()
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState(null)
    const lastDoc = storageDocList[storageDocList.length - 1]
    const [newStorageDoc, setNewStorageDoc] = useState({
        client: '',
        storage: '',
        user: user.username,
        type: 'coming',
        description: '',

    })
    const deleteStorageDoc = useDeleteStorageDoc(lastStorageDoc)
    const handleClickOpen = () => setOpen(true)
    const handleClickClose = (event, reason) => {
        const lastDoc = storageDocList[storageDocList.length - 1]
        if (lastDoc.status === 'open') {
            setLastStorageDoc(lastDoc)
            deleteStorageDoc.mutate()
        }
        if (reason && reason === "backdropClick")
            return
        setOpen(false)
    }
    const handleChangeStorage = (event) => {
        setNewStorageDoc({...newStorageDoc, storage: event.target.value})
    }
    const handleChangeClients = (event, newValue) => {
        setValue(newValue)
        setNewStorageDoc({...newStorageDoc, client: newValue.name})
    }
    const handleClickAdd = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    useEffect(() => {
        if (user.username === lastDoc.user) {
            if (lastDoc.status === 'open') {
                setLastStorageDoc(lastDoc)
                deleteStorageDoc.mutate()
            }
        }
    }, [lastStorageDoc])

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
                        <FormControl required={true}>
                            <InputLabel id="demo-simple-select-label">Storage</InputLabel>
                            <Select
                                labelId="StorageSelectLabel"
                                id="StorageSelect"
                                value={newStorageDoc.storage}
                                label="Storage"
                                onChange={handleChangeStorage}
                            >{storageList.map((obj, index) => {
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
                            value={value}
                            onChange={handleChangeClients}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                            id="ClientSelect"
                            options={clientsList}
                            sx={{width: 300}}
                            getOptionLabel={options => options.name}
                            renderOption={(props, option) => {
                                const {key, ...optionProps} = props
                                return (
                                    <Box key={key} component="li" {...optionProps}>
                                        {option.name}
                                    </Box>
                                )
                            }}
                            renderInput={(params) => <TextField required={true} margin='dense' {...params}
                                                                label="Supplier"/>}
                        />
                    </Box>
                    <CreateDocTable newStorageDoc={newStorageDoc}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
