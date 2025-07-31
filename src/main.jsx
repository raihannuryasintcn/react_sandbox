import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import Sidebar from './layout/sidebar';
import Breadcrumb from './layout/breadcrumb';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Breadcrumb />
            <App />
          </main>
        </div>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
