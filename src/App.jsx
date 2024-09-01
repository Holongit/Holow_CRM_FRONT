import {Route, Routes} from 'react-router-dom';

import Storage from './pages/storage/Storage.jsx';
import Finance from './pages/finance/Finance.jsx';
import Service from './pages/service/Service.jsx';
import Store from './pages/store/Store.jsx';
import Statistics from './pages/statistics/Statistics.jsx';
import Layout from './pages/Layout.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/login/Login.jsx';
import Registration from './pages/registration/Registration.jsx';

const user = JSON.parse(localStorage.getItem('user'))

function App() {
    if (user) {
        return (
            <>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route path='/finance' element={<Finance/>}/>
                        <Route path='/' element={<Storage/>}/>
                        <Route path='/service' element={<Service/>}/>
                        <Route path='/store' element={<Store/>}/>
                        <Route path='/statistics' element={<Statistics/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='login/' element={<Login/>}/>
                    <Route path='registration/' element={<Registration/>}/>
                </Routes>
            </>
        )
    } else {
        return (
            <Login/>
        )
    }
}


export default App

