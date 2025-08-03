// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Funnel from './salesFunnel/funnel'
import CompetitiveMap from './competitiveMap/leaflet'
import NotFound from './notFound/notFound'
import Login from './loginPage/login'
import Fetch from './fetch/fetch'

const App = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/fetch" element={<Fetch />} />
                <Route path="/login" element={<Login />} />
                <Route path="/funnel" element={<Funnel />} />
                <Route path="/competitive-map" element={<CompetitiveMap />} />
                <Route path="/*" element={<NotFound />} />

            </Routes>
        </div>
    )
}

export default App
