import React, { useState } from 'react';
import { useWeather } from '../Context/WeatherContext';
import './Search.css'
const Search = () => {
  const [city, setCity] = useState('');
  const { fetchWeather } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="weather__search">
        <input
          type="text"
          placeholder="Search for a city..."
          className="weather__searchform"
          value={city}
          onChange={(e) => setCity(e.target.value)}  
        />
        <button className='Search' type="submit">
        Search
        </button>
      </form>
    </div>
  );
};

export default Search;
