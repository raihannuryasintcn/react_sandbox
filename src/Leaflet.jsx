import 'leaflet/dist/leaflet.css'
import { divIcon } from "leaflet"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from 'leaflet'

// Fix untuk default marker icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const providers = [
    { 
        name: "ICONNET", 
        color: "#bbcf82", // Blue
        locations: [
            [0.133505, 103.447403],
            [0.633505, 99.547403],
            [-1.33505, 101.347403]
        ]
    },
    { 
        name: "FirstMedia", 
        color: "#d46b60ff", // Red
        locations: [
            [-5.3971, 105.2668],
            [-5.4971, 104.3668],
            [-5.0971, 105.3668]
        ]
    },
    { 
        name: "BiznetHome", 
        color: "#c39f65ff", // Orange
        locations: [
            [3.5483, 97.3238],
            [5.1183, 96.4238],
            [5.4483, 95.2238]
        ]
    }
]

const createCustomIcon = (color) => {
    return divIcon({
        html: `
            <div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid black;"></div>
        `,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    })
}

function Map() {
    return (
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
            {providers.flatMap((provider) => 
                provider.locations.map((location, locationIndex) => (
                    <Marker 
                        key={`${provider.name}-${locationIndex}`}
                        position={location} 
                        icon={createCustomIcon(provider.color)} 
                    />
                ))
            )}
        </MapContainer>
    )
}

export default Map