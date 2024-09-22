import {useEffect, useState} from 'react';

import {Container, Grid, LinearProgress} from '@mui/material';

import AppHeader from '../../widgets/Storage/AppHeader/AppHeader.jsx';
import AppBody from '../../widgets/Storage/AppBody/AppBody.jsx';
import Box from '@mui/material/Box';
import {API_STORAGE} from '../../API/API_URLS.js';


function Storage() {

    useEffect(() => {
        API_STORAGE
            .get('goods/')
            .then((response) => setGoodList(response.data.results))
            .catch((error) => {
                console.log(error.message + ' ' + error.code)
            })
        API_STORAGE
            .get('storages/')
            .then((response) => setStorageList(response.data.results))
            .catch((error) => {
                console.log(error.message + ' ' + error.code)
            })
        API_STORAGE
            .get('doc/')
            .then((response) => setStorageDocList(response.data.results))
            .catch((error) => {
                console.log(error.message + ' ' + error.code)
            })
        API_STORAGE
            .get('clients/')
            .then((response) => setClientsList(response.data.results))
            .catch((error) => {
                console.log(error.message + ' ' + error.code)
            })
        API_STORAGE
            .get('remains/')
            .then((response) => {
                setRemainsList(response.data.results)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message + ' ' + error.code)
            })
    }, [])

    const [storageList, setStorageList] = useState(null)
    const [goodsList, setGoodList] = useState([])
    const [remainsList, setRemainsList] = useState([])
    const [searchRemains, setSearchRemains] = useState(remainsList)
    const [clientsList, setClientsList] = useState([])
    const [storageDocList, setStorageDocList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleSearch()
    }, [remainsList])

    const handleSearch = (search, storage) => {
        let remains_query = [...remainsList]
        if (search) {
            remains_query = remains_query.filter(c => c.goods.toLowerCase().includes(search.toLowerCase()))
        }
        if (storage) {
            remains_query = remains_query.filter(c => c.storage.toLowerCase().includes(storage.toLowerCase()))
        }
        setSearchRemains(remains_query)
    }

    return (
        <>
            {loading
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
