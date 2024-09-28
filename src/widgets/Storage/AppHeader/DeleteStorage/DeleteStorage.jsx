import MenuItem from '@mui/material/MenuItem';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteApiStorage} from '../../../../API/API_FUNC.js';

export default function DeleteStorage({obj, setOpenStorage}) {

    const queryClient = useQueryClient()

    const useDeleteStorage = useMutation({
        mutationFn: () => deleteApiStorage(obj),
        onSuccess: () => queryClient.invalidateQueries(['storage', 'storages']),
        onError: (error) => console.log(error)
    })

    const handleMenuItemClick = () => {
        const confirm = window.confirm('Delete Storage?')
        if (confirm) {
            useDeleteStorage.mutate()
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