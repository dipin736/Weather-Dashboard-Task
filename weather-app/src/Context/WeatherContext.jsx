import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWeatherEndpoint } from '../Utils/api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); 


const fetchWeather = async (city) => {
  setLoading(true);
  setError(null);
  const endpoint = getWeatherEndpoint(city, unit); 
  try {
    const res = await fetch(endpoint);
    
    if (!res.ok) {
      throw new Error('City not found. Please check the city name and try again.');
    }
    
    const data = await res.json();
    setWeatherData(data);
    localStorage.setItem('lastCity', city); 
    
  } catch (err) {
    // Specific error handling
    if (err.message === 'City not found. Please check the city name and try again.') {
      setError('Error: City not found. Please check the city name and try again.');
    } else if (err.message === 'Failed to fetch') {
      setError('Error: Unable to fetch data. Please check your network connection.');
    } else if (err.message.includes('Server error')) {
      setError('Error: Server is down. Please try again later.');
    } else {
      setError('An unknown error occurred. Please try again.');
    }
  } finally {
    setLoading(false); 
  }
};


  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) fetchWeather(lastCity);
  }, [unit]); 

  return (
    <WeatherContext.Provider value={{ weatherData, loading, error, fetchWeather, unit, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};


export const useWeather = () => useContext(WeatherContext);
