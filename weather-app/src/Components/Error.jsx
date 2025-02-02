import React from 'react';
import Search from './Search';
import { useWeather } from '../Context/WeatherContext';

const Error = ({ error, loading, weatherData, handleSearch }) => {

  if (error) {
    return (
      <div className="container">
        <div className="weather__header">
          <Search onSearch={handleSearch} />
        </div>
        <div className="weather__body">
          <div className="weather__error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="container">
        <div className="weather__header">
          <Search onSearch={handleSearch} />
        </div>
        <div className="weather__body">
          <p>Loading...</p>
        </div>
      </div>
    );
  }


  if (!weatherData) {
    return (
      <div className="container">
        <div className="weather__header">
          <Search onSearch={handleSearch} />
        </div>
        <div className="weather__body">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return null; 
};

export default Error;
