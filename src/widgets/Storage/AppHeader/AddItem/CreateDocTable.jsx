import * as React from "react";
import {useState} from "react";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
    Autocomplete,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete.js";
import Box from "@mui/material/Box";

import {
    useCreateStorageDocTable, useDeleteStorageDocTable,
    useGoodsList,
    useStorageDocTableList
} from "../../../../API/API_HOOKS.js";


export default function CreateDocTable({openDoc}) {

    const {data: goodsList} = useGoodsList()
    const {data: docTableList} = useStorageDocTableList()
    const [inputProductValue, setInputProductValue] = useState('')
    const [productValue, setProductValue] = useState(null)
    const [qnt, setQnt] = useState(1)
    const [row, setRow] = useState([])
    const [newStorageDocTable, setNewStorageDocTable] = useState({
        goods_qnt: qnt,
        storage_doc: openDoc.id,
        goods: '',
    })
    const createStorageDocTable = useCreateStorageDocTable(newStorageDocTable)
    const deleteStorageDocTable = useDeleteStorageDocTable(row)

    const handleChangeProduct = async (event, newValue) => {
        // console.log(newValue)
        if (newValue && qnt > 0) {
            setProductValue(newValue)
            setNewStorageDocTable({...newStorageDocTable, goods: newValue.id, storage_doc: openDoc.id, goods_qnt: qnt})
            await createStorageDocTable.mutate()
        }
        setQnt(1)
    }
    const handleClickDeleteProduct = async (rowId) => {
        setRow(rowId)
        await deleteStorageDocTable.mutate()
    }

    // console.log('goodsList: ', goodsList)
    // console.log('openDoc: ', openDoc)
    // console.log('docTableList: ', docTableList)
    // console.log('row: ', row)

    return (
        <>
            <Stack direction='row' spacing={2} marginTop={2} useFlexGap>
                <Autocomplete
                    disabled={openDoc.length === 0}
                    value={productValue}
                    onChange={handleChangeProduct}
                    inputValue={inputProductValue}
                    onInputChange={(event, newInputValue) => setInputProductValue(newInputValue)}
                    id="ClientSelect"
                    options={goodsList}
                    fullWidth
                    getOptionLabel={option => `#${option.id} ${option.common_goods} - ${option.parameters} - ${option.serial_number} - ${option.price_in}zł`}
                    renderOption={(props, option) => {
                        const {key, ...optionProps} = props
                        return (
                            <Box
                                key={option.id} component="li"
                                {...optionProps}>
                                #{option.id} {option.common_goods} - {option.parameters} - {option.serial_number} - {option.price_in}zł
                            </Box>
                        )
                    }}
                    renderInput={(params) =>
                        <TextField
                            disabled={openDoc.length === 0}
                            margin='dense'
                            fullWidth
                            {...params}
                            label="Add Product"
                        />
                    }
                />
                <TextField
                    disabled={openDoc.length === 0}
                    id="outlined-number"
                    label="qnt"
                    type="number"
                    margin='dense'
                    sx={{maxWidth: 100}}
                    fullWidth
                    value={qnt}
                    onChange={e => setQnt(e.target.value)}
                />
            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="center">Invoice</TableCell>
                            <TableCell align="center">Goods</TableCell>
                            <TableCell align="center">Qnt</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docTableList.filter(obj => parseInt(obj.storage_doc.match(/\d+/)) === openDoc.id).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="center">{row.storage_doc}</TableCell>
                                <TableCell align="center">{row.goods}</TableCell>
                                <TableCell align="center">{row.goods_qnt}</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{margin: -5}} onClick={() => handleClickDeleteProduct(row)}>
                                        <DeleteIcon fontSize='small' color='error'/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}