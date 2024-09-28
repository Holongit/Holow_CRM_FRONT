import MenuItem from '@mui/material/MenuItem';

import {useDeleteStorage} from "../../../../API/API_HOOKS.js";

export default function DeleteStorage({obj, setOpenStorage}) {

    const deleteStorage = useDeleteStorage(obj)
    const handleMenuItemClick = () => {
        const confirm = window.confirm('Delete Storage?')
        if (confirm) {
            deleteStorage.mutate()
        }
        setOpenStorage(false)
    }

    return (
        <>
            <MenuItem onClick={(event) => handleMenuItemClick(event)}>
                Delete
            </MenuItem>
        </>
    )
}