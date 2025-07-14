import React from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ weather, unit }) => {
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <motion.div
      className="weather-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{weather.name}, {weather.sys.country}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </motion.div>
  );
};

export default WeatherCard;
