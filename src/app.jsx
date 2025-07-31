// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Funnel from './salesFunnel/Funnel'
import competitiveMap from './competitiveMap/leaflet'
import NotFound from './notFound/notFound'

const App = () => {
    return (
        <div className="bg-gray-100">
            <Routes>
                <Route path="/funnel" element={<Funnel />} />
                <Route path="/competitive-map" element={<competitiveMap />} />
                <Route path="/*" element={<NotFound />} />

            </Routes>
        </div>
    )
}

export default App
