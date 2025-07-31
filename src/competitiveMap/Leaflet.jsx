import { useState } from "react";

import internetServiceProviders from './isp.json'
import IspMapDropdown from "./ispMapDropdown"

import ReactEcharts from 'echarts-for-react'

import 'leaflet/dist/leaflet.css'
import { divIcon } from "leaflet"
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css';         // transisi cluster
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // gaya cluster default
import Legend from "./legend";


function pieChart() {
    return (
        <></>
    )
}


const createCustomIcon = (color) => {
    return divIcon({
        html: `
            <div
                class="bg-${color} w-[30px] h-[30px] rounded-full border border-gray-800"
            />
        `,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    })
}

const offsetPosition = (lat, lng, index, total) => {
    const radius = 0.03; // atur di sini (misal 0.01 = 1000 meter)
    const angle = (index / total) * 2 * Math.PI; // distribusi melingkar
    const offsetLat = lat + radius * Math.sin(angle);
    const offsetLng = lng + radius * Math.cos(angle);
    return [offsetLat, offsetLng];
};


function Map() {
    const [selectedProvider, setSelectedProvider] = useState(
        internetServiceProviders.map(p => p.name) // default: semua dipilih
    );
    return (
        <div style={{ position: "relative" }}>
            {/* Dropdown simple di kiri atas */}
            <IspMapDropdown
                providers={internetServiceProviders}
                selected={selectedProvider}
                setSelected={setSelectedProvider}
            />
            <MapContainer
                center={[-5.0, 120.0]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                />
                {/* --------------------------------- Marker --------------------------------- */}
                {/* <MarkerClusterGroup
                spiderfyDistanceMultiplier={2} // default: 1
                showCoverageOnHover={true}
                maxClusterRadius={20} // optional: mengatur radius cluster
            > */}
                {internetServiceProviders
                    .filter(p => selectedProvider.includes(p.name))
                    .flatMap((p) =>
                        p.locations.map((location, locationIndex) => (
                            <Marker
                                key={`${p.name}-${locationIndex}`}
                                position={offsetPosition(location.lat, location.lng, locationIndex, p.locations.length)}
                                icon={createCustomIcon(p.color)}
                            >
                                <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent={false}> {/*permanent={false} to show tooltip on hover*/}
                                    <div className="flex flex-col items-center">
                                        <div className="font-semibold text-sm mb-0.5 text-gray-800">
                                            {p.name}

                                        </div>
                                        <div className="text-xs text-gray-700">
                                            {location.city}
                                        </div>
                                    </div>
                                </Tooltip>
                            </Marker>
                        ))
                    )}
                {/* </MarkerClusterGroup> */}

                {/* --------------------------------- End Marker --------------------------------- */}
            </MapContainer>
            <Legend
                providers={internetServiceProviders}
            />
        </div>
    )
}

export default Map