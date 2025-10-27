import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { getCoordinates, getCurrentWeather } from './utils/weatherService';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem('recentCities');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const coords = await getCoordinates(city);
      const currentWeather = await getCurrentWeather(coords.lat, coords.lon);
      setWeather(currentWeather);
      const cityName = coords.displayName.split(',')[0];
      setLocationName(cityName);

      const newRecent = [city, ...recentCities.filter(c => c !== city)].slice(0, 5);
      setRecentCities(newRecent);
      localStorage.setItem('recentCities', JSON.stringify(newRecent));
    } catch (err) {
      setError(err.message || 'Could not fetch weather. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Now</h1>
        <p>For outdoor lovers like Jamie</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <div className="spinner"></div>}
        {error && <div className="error-message">❌ {error}</div>}
        {weather && <WeatherCard weather={weather} location={locationName} />}

        {recentCities.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Cities</h3>
            <div>
              {recentCities.map((city, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(city)}
                  className="recent-city"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;