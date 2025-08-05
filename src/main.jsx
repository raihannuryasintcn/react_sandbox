import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import Sidebar from './layout/sidebar';
import Breadcrumb from './layout/breadcrumb';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <MantineProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-gray-100">
            <Breadcrumb />
            <App />
          </main>
        </div>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
