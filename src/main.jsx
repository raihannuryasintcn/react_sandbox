import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Map from './competitiveMap/Leaflet.jsx'

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import FunnelStatus from './salesFunnel/Funnel.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <FunnelStatus />
    </MantineProvider>
  </StrictMode>,
)
