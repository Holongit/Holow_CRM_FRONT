import Box from '@mui/material/Box';
import {LinearProgress} from '@mui/material';


function Loading() {

    return (
        <>
            <Box sx={{
                width: '100%',
                marginTop: 8,
                margin: '-8px',
            }}
            >
                <LinearProgress/>
            </Box>
        </>
    )
}

export default Loading