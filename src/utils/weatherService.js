const GEOCODING_API = 'https://nominatim.openstreetmap.org/search?format=json&q=';

export const getCoordinates = async (city) => {
  const response = await fetch(`${GEOCODING_API}${encodeURIComponent(city)}`);
  const data = await response.json();
  if (data.length === 0) throw new Error('City not found');
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
};

export const getCurrentWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch weather');
  const data = await response.json();
  return data.current_weather;
};

export const getWeatherDescription = (code) => {
  if (code === 0) return 'Clear sky';
  if (code >= 1 && code <= 3) return 'Mainly clear, partly cloudy, or overcast';
  if (code >= 45 && code <= 48) return 'Fog or rime fog';
  if (code >= 51 && code <= 57) return 'Drizzle: light to heavy';
  if (code >= 61 && code <= 67) return 'Rain: slight to heavy';
  if (code >= 71 && code <= 77) return 'Snow fall: slight to heavy';
  if (code === 80) return 'Rain showers: slight';
  if (code === 81) return 'Rain showers: moderate';
  if (code === 82) return 'Rain showers: violent';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code === 95) return 'Thunderstorm: slight or moderate';
  if (code >= 96 && code <= 99) return 'Thunderstorm with hail';
  return 'Unknown weather';
};

export const getWeatherIconAndDescription = (code) => {
  if (code === 0) return { icon: '☀️', desc: 'Clear sky' };
  if (code >= 1 && code <= 3) return { icon: '⛅', desc: 'Mainly clear, partly cloudy, or overcast' };
  if (code >= 45 && code <= 48) return { icon: '🌫️', desc: 'Fog or rime fog' };
  if (code >= 51 && code <= 57) return { icon: '🌦️', desc: 'Drizzle: light to heavy' };
  if (code >= 61 && code <= 67) return { icon: '🌧️', desc: 'Rain: slight to heavy' };
  if (code >= 71 && code <= 77) return { icon: '❄️', desc: 'Snow fall: slight to heavy' };
  if (code === 80) return { icon: '🌦️', desc: 'Rain showers: slight' };
  if (code === 81) return { icon: '🌧️', desc: 'Rain showers: moderate' };
  if (code === 82) return { icon: '⛈️', desc: 'Rain showers: violent' };
  if (code >= 85 && code <= 86) return { icon: '🌨️', desc: 'Snow showers' };
  if (code === 95) return { icon: '⛈️', desc: 'Thunderstorm: slight or moderate' };
  if (code >= 96 && code <= 99) return { icon: '⛈️❄️', desc: 'Thunderstorm with hail' };
  return { icon: '❓', desc: 'Unknown weather' };
};