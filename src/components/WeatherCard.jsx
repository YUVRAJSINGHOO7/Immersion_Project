import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const iconMap = {
  '01d': 'CLEAR_DAY',
  '01n': 'CLEAR_NIGHT',
  '02d': 'PARTLY_CLOUDY_DAY',
  '02n': 'PARTLY_CLOUDY_NIGHT',
  '03d': 'CLOUDY',
  '03n': 'CLOUDY',
  '04d': 'CLOUDY',
  '04n': 'CLOUDY',
  '09d': 'RAIN',
  '09n': 'RAIN',
  '10d': 'RAIN',
  '10n': 'RAIN',
  '11d': 'SLEET',
  '11n': 'SLEET',
  '13d': 'SNOW',
  '13n': 'SNOW',
  '50d': 'FOG',
  '50n': 'FOG'
};

function WeatherCard({ weather, unit }) {
  const icon = iconMap[weather.weather[0].icon] || 'CLEAR_DAY';

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <ReactAnimatedWeather
        icon={icon}
        color="#4a90e2"
        size={64}
        animate={true}
      />
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
}

export default WeatherCard;
