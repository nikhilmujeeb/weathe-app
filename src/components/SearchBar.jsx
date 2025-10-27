import React, { useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = React.useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g., Tokyo, Denver)"
        disabled={loading}
        className="search-input"
      />
      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="search-button"
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
    </form>
  );
};

export default SearchBar;