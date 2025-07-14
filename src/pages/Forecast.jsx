import React, { useState, useEffect } from 'react';

const API_KEY = 'ed2c6f01bb2131ab77462e6db97d0939';

function Forecast() {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState('metric');
    const [location, setLocation] = useState(null);

    const fetchForecast = async (query, type = 'city') => {
        setLoading(true);
        let url = '';
        if (type === 'city') {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=${unit}`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=${unit}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("Forecast data:", data);

            if (data.cod === "200") {
                setForecast(data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Network error or invalid response.');
        }
        setLoading(false);
    };

    // Try geolocation on load
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                    setLocation(coords);
                    fetchForecast(coords, 'coords');
                },
                err => {
                    console.log("Geolocation denied.", err);
                    // fallback to a default city
                    fetchForecast("Delhi", 'city');
                }
            );
        } else {
            fetchForecast("Delhi", 'city');
        }
        // eslint-disable-next-line
    }, [unit]);

    const toggleUnit = () => {
        setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
        if (location) {
            fetchForecast(location, 'coords');
        }
    };

    return (
        <div>
            <h1>5-Day Forecast 📅</h1>
            <div className="unit-toggle-container">
                <button className="unit-toggle" onClick={toggleUnit}>
                    {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
                </button>
            </div>
            {loading && <p>Loading forecast...</p>}
            {forecast && (
                <div className="forecast-grid">
                    {forecast.list.filter((_, i) => i % 8 === 0).map((item, index) => (
                        <div key={index} className="weather-card">
                            <h2>{new Date(item.dt_txt).toLocaleDateString()}</h2>
                            <p>{item.weather[0].description}</p>
                            <p>Temp: {item.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                            <p>Humidity: {item.main.humidity}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Forecast;
