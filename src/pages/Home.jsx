import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

const API_KEY = 'ed2c6f01bb2131ab77462e6db97d0939';

function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState('metric');

    // Fetch by city name or by coords
    const fetchWeather = async (query, type = 'city') => {
        setLoading(true);
        let url;
        if (type === 'city') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${unit}`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=${unit}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("API response:", data);

            if (data.cod === 200) {
                setWeather(data);
            } else {
                setWeather(null);
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Network error or invalid response.');
        }
        setLoading(false);
    };

    // Auto detect location on load
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }, 'coords');
                },
                err => {
                    console.log("Geolocation denied.", err);
                }
            );
        }
        // eslint-disable-next-line
    }, [unit]); // triggers refetch on unit change

    // Submit search form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) fetchWeather(city);
    };

    // Toggle unit
    const toggleUnit = () => {
        setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
        if (weather && weather.coord) {
            fetchWeather({ lat: weather.coord.lat, lon: weather.coord.lon }, 'coords');
        }
    };

    return (
        <>
            <h1>Weather App 🌤️</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            <div className="unit-toggle-container">
                <button className="unit-toggle" onClick={toggleUnit}>
                    {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {weather && <WeatherCard weather={weather} unit={unit} />}
        </>
    );
}

export default Home;
