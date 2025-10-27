import React from 'react';
import { getWeatherIconAndDescription } from '../utils/weatherService';

const WeatherCard = ({ weather, location }) => {
  if (!weather) return null;

  const { icon, desc } = getWeatherIconAndDescription(weather.weathercode);

  return (
    <div className="weather-card">
      <h2>Now in {location}</h2>
      <div className="weather-icon">{icon}</div>
      <p className="temperature">{weather.temperature}°C</p>
      <p className="weather-desc">{desc}</p>
      <p>💨 Wind: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;