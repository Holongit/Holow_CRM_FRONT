import {Container, Grid} from '@mui/material';

import AppHeader from '../../widgets/Storage/AppHeader/AppHeader.jsx';
import AppBody from '../../widgets/Storage/AppBody/AppBody.jsx';
import axios from 'axios';
import {useEffect, useState} from 'react';


const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1/storage/',
    timeout: 15000,
    withCredentials: true,
    xsrfHeaderName: "X-CSRFTOKEN",
    xsrfCookieName: "csrftoken",
})

function Storage() {

    useEffect(() => {
        API
            .get('goods/')
            .then((response) => setGoodList(response.data.results))
            .catch((error) => {
                console.log(error)
            })
        API
            .get('storages/')
            .then((response) => setStorageList(response.data.results))
            .catch((error) => {
                console.log(error)
            })
        API
            .get('remains/')
            .then((response) => setRemainsList(response.data.results))
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const [storageList, setStorageList] = useState(null)
    const [goodsList, setGoodList] = useState([])
    const [remainsList, setRemainsList] = useState([])
    const [searchRemains, setSearchRemains] = useState(remainsList)

    useEffect(()=>{handleSearch()},[remainsList])

    const handleSearch = (search, storage) => {
        let remains_query = [...remainsList]
        if (search) {
            remains_query = remains_query.filter(c => c.goods.toLowerCase().includes(search.toLowerCase()))
        }
        if (storage) {
            remains_query = remains_query.filter(c=>c.storage.toLowerCase().includes(storage.toLowerCase()))
        }
        setSearchRemains(remains_query)
    }

    return (
        <Container maxWidth="false" sx={{mt: 10}}>
            <Grid container spacing={2}
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="stretch"
            >
                <Grid item><AppHeader storageList={storageList} onSearch={handleSearch}/></Grid>
                <Grid item><AppBody goodsList={goodsList} remainsList={searchRemains}/></Grid>

            </Grid>
        </Container>
    );
}

export default Storage;
