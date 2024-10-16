import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import App from './App.jsx'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
                <ReactQueryDevtools/>
            </BrowserRouter>
        </QueryClientProvider>
)
