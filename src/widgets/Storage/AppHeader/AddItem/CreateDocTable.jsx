import Paper from "@mui/material/Paper";
import {Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import {useState} from "react";
import {useClientsList, useCreateStorageDoc} from "../../../../API/API_HOOKS.js";


function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CreateDocTable({newStorageDoc}) {
    const {data: clientsList} = useClientsList()
    const [inputValue, setInputValue] = useState('')
    const [currentDocId, setCurrentDocId] = useState(null)
    const [value, setValue] = useState(null)
    const createStorageDoc = useCreateStorageDoc(newStorageDoc)

    const handleChangeProduct = async (event, newValue) => {
        if (newStorageDoc.storage !== '' && newStorageDoc.clients !== '' && !currentDocId) {
            await createStorageDoc.mutate()
            const response = await createStorageDoc.data
            setCurrentDocId(response.data.id)
        }
        setValue(newValue)
    }

    console.log(currentDocId)

    return (
        <>
            <Autocomplete
                value={value}
                onChange={handleChangeProduct}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                id="ClientSelect"
                options={clientsList}
                sx={{width: 'auto'}}
                getOptionLabel={options => options.name}
                renderOption={(props, option) => {
                    const {key, ...optionProps} = props
                    return (
                        <Box key={key} component="li" {...optionProps}>
                            {option.name}
                        </Box>
                    )
                }}
                renderInput={(params) => <TextField sx={{marginTop: 0}} {...params} label="Add Product"/>}
            />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}