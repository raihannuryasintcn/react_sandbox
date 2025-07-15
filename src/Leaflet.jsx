import 'leaflet/dist/leaflet.css'
import { divIcon } from "leaflet"
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import L from 'leaflet'
import internetServiceProvider from './ispData.json';
import Legend from './Legend'
import MarketShareComponent from './MarketShareComponent';



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

function App() {
    return (
      <div>
        <h1 className="text-center text-xl font-bold">My Chart</h1>
        <MarketShareComponent />
      </div>
    );
  }

function Map() {
    return (
        <div style={{ position: 'relative' }}> 
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
                {internetServiceProvider.flatMap((provider) =>
                    provider.locations.map((location, locationIndex) => (
                        <Marker 
                            key={`${provider.name}-${locationIndex}`}
                            position={location} 
                            icon={createCustomIcon(provider.color)} 
                        >
                            <Tooltip className="text-center">
                                <div className="font-extrabold text-align-center"> 
                                    {provider.name}
                                </div>
                                <div>
                                    {location.city}
                                </div>
                            </Tooltip>
                        </Marker>
                    ))
                )}
            </MapContainer>
            <Legend />
        </div>
        
        
    )
}

export default Map