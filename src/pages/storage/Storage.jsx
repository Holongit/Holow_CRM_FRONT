import {useEffect, useState} from 'react';

import {Container, Grid, LinearProgress} from '@mui/material';

import AppHeader from '../../widgets/Storage/AppHeader/AppHeader.jsx';
import AppBody from '../../widgets/Storage/AppBody/AppBody.jsx';
import Box from '@mui/material/Box';

import {
    useClientsList,
    useGoodsList,
    useRemainsList,
    useStorageDocList,
    useStorageList
} from '../../API/API_HOOKS.js';


function Storage() {
    const {data: goodsList} = useGoodsList()
    const {data: storageList} = useStorageList()
    const {data: storageDocList} = useStorageDocList()
    const {data: clientsList} = useClientsList()
    const {data: remainsList, isLoading} = useRemainsList()
    const [searchRemains, setSearchRemains] = useState(remainsList)

    useEffect(() => {
        handleSearch()
    }, [remainsList])

    const handleSearch = (search, storage) => {
        if (remainsList && []){
            let remains_query = [...remainsList]
            if (search) {
                remains_query = remains_query.filter(c => c.goods.toLowerCase().includes(search.toLowerCase()))
            }
            if (storage) {
                remains_query = remains_query.filter(c => c.storage.toLowerCase().includes(storage.toLowerCase()))
            }
            setSearchRemains(remains_query)
        }
    }

    return (
        <>
            {isLoading
                ?
                <Box sx={{ width: '100%', marginTop: 8 }}><LinearProgress /></Box>
                :
                <Container maxWidth="false" sx={{mt: 10}}>
                    <Grid container spacing={2}
                          direction="column"
                          justifyContent="flex-end"
                          alignItems="stretch"
                    >
                        <Grid item>
                            <AppHeader clientsList={clientsList}
                                       storageDocList={storageDocList}
                                       storageList={storageList}
                                       onSearch={handleSearch}
                            />
                        </Grid>
                        <Grid item>
                            <AppBody goodsList={goodsList}
                                     remainsList={searchRemains}
                            />
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    );
}

export default Storage;
