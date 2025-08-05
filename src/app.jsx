import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Funnel from './salesFunnel/funnel'
import CompetitiveMap from './competitiveMap/leaflet'
import NotFound from './notFound/notFound'
import Login from './loginPage/login'
import Tasks from './tasks/tasks.tsx'

const App = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/funnel" element={<Funnel />} />
                <Route path="/competitive-map" element={<CompetitiveMap />} />
                <Route path="/*" element={<NotFound />} />

            </Routes>
        </div>
    )
}

export default App
