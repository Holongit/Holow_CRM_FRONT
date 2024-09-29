import * as React from 'react'
import {useState} from 'react'

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
    useCreateStorageDoc,
    useStorageDocList,
    useStorageList,
    useUsersMe
} from "../../../../API/API_HOOKS.js";
import MenuItem from "@mui/material/MenuItem";


export default function AddItem() {

    const {data: storageList} = useStorageList()
    const {data: storageDocList} = useStorageDocList()
    const {data: clientsList} = useClientsList()
    const {data: user} = useUsersMe()
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState(null)
    const [newStorageDoc, setNewStorageDoc] = useState({
        client: '',
        storage: '',
        user: user.username,
        type: 'IN',
        description: '',

    })

    const createStorageDoc = useCreateStorageDoc(newStorageDoc)
    const handleClickOpen = () => setOpen(true)
    const handleClickClose = () => setOpen(false)
    const handleChangeStorage = (event) => setNewStorageDoc({...newStorageDoc, storage: event.target.value})
    const handleClickAdd = (e) => {
        e.preventDefault()
        createStorageDoc.mutate()
        setOpen(false)
    }
    const handleChangeClients = (event, newValue) => {
        setValue(newValue)
        setNewStorageDoc({...newStorageDoc, client: newValue.name})
    }

    console.log(newStorageDoc)
    // console.log(clientsList)
    // console.log(inputValue)
    // console.log(value)

    return (
        <React.Fragment>
            <Button variant="text" color='inherit' onClick={handleClickOpen}>
                AddItem
            </Button>
            <Dialog
                open={open}
                onClose={handleClickClose}
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle>Income</DialogTitle>
                <DialogContent>
                    <DialogContentText/>
                    <Box sx={{maxWidth: '29ch'}}>
                        <FormControl margin='dense' fullWidth>
                            <InputLabel id="demo-simple-select-label">Storage</InputLabel>
                            <Select
                                labelId="StorageSelectLabel"
                                id="StorageSelect"
                                value={newStorageDoc.storage}
                                label="Storage"
                                onChange={handleChangeStorage}
                            >{storageList.map((obj, index)=>{
                                return <MenuItem key={index} value={obj.name}>{obj.name}</MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            value={value}
                            onChange={handleChangeClients}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                            id="ClientSelect"
                            options={clientsList}
                            autoHighlight
                            sx={{ width: 300 }}
                            getOptionLabel={options=>options.name}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props
                                return (
                                    <Box key={key} component="li" {...optionProps}>
                                        {option.name}
                                    </Box>
                                )
                            }}
                            renderInput={(params) => <TextField {...params} label="Client" />}
                        />
                        <TextField
                            margin='dense'
                            id='note'
                            label='Description'
                            onChange={e => setNewStorageDoc({...newStorageDoc, description: e.target.value})}/>
                    </Box>


                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '29ch'},}}
                        noValidate
                        autoComplete="off"
                    ></Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
