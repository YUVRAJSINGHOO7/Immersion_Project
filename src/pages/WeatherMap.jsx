import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = 'ed2c6f01bb2131ab77462e6db97d0939';

function WeatherMap() {
    const [layer, setLayer] = useState('temp_new');

    const handleLayerChange = (newLayer) => {
        setLayer(newLayer);
    };

    return (
        <div className="page-container">
            <h1>India Weather Map 🇮🇳</h1>
            <div>
                <button onClick={() => handleLayerChange('temp_new')}>Temperature</button>
                <button onClick={() => handleLayerChange('clouds_new')}>Clouds</button>
                <button onClick={() => handleLayerChange('wind_new')}>Wind</button>
                <button onClick={() => handleLayerChange('precipitation_new')}>Precipitation</button>
            </div>
            <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "500px", width: "100%", marginTop: "20px" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <TileLayer
                    url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    attribution="&copy; OpenWeatherMap"
                    opacity={0.6}
                />
            </MapContainer>
        </div>
    );
}

export default WeatherMap;
