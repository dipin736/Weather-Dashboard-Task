import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/WeatherContext";
import "./Weather.css";
import Search from "./Search";
import Error from "./Error";

const Weather = () => {
  const { weatherData, loading, error, unit, setUnit, fetchWeather } =
    useWeather();
  const [cityName, setCityName] = useState(""); // Track the city being searched

  const handleSearch = (city) => {
    setCityName(city);
    fetchWeather(city);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherData) {
        fetchWeather(weatherData.city?.name);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [weatherData, fetchWeather]);

  if (error || loading || !weatherData) {
    return (
      <Error
        error={error}
        loading={loading}
        weatherData={weatherData}
        handleSearch={handleSearch}
      />
    );
  }

  const { city, list } = weatherData || {};
  console.log(weatherData)
  const currentWeather = list?.[0];
  const { weather } = currentWeather || {};  
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather?.[0]?.icon}@2x.png`;



  return (
    <div className="container">
      <div className="weather__header">
        <Search onSearch={handleSearch} />
        <div className="weather__units">
          <button
            className="Search"
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          >
            Switch to {unit === "metric" ? "Fahrenheit (°F)" : "Celsius (°C)"}
          </button>
        </div>
      </div>

      {/* Current Weather */}
      <div className="weather__body">
        <h2 className="weather__city">City: {city?.name}</h2>
        <p className="weather__description">
          Condition: {currentWeather?.weather?.[0]?.description}
        </p>
        <div className="weather__icon">
          <img src={weatherIconUrl} alt={currentWeather?.weather?.[0]?.description} />
        </div>
        <p className="weather__temperature">
          Temperature: {currentWeather?.main?.temp}°
          {unit === "metric" ? "C" : "F"}
        </p>

        <div className="weather__minmax">
          <p>Min: {currentWeather?.main?.temp_min}°</p>
          <p>Max: {currentWeather?.main?.temp_max}°</p>
        </div>

        {/* 5-Day Forecast */}
        <h2>5-Day Forecast</h2>
        <div className="forecast">
          {list?.map((day, index) => (
            <div key={index} className="forecast__day">
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>Temp: {day.main.temp}°C</p>
              <p>Condition: {day.weather[0].description}</p>
            </div>
          ))}
        </div>

        <div className="weather__info">
          <div className="weather__card">
            <i className="fa-solid fa-temperature-full" />
            <div>
              <p>Feels Like</p>
              <p className="weather__realfeel">
                {currentWeather?.main?.feels_like}°
              </p>
            </div>
          </div>
          <div className="weather__card">
            <i className="fa-solid fa-droplet" />
            <div>
              <p>Humidity</p>
              <p className="weather__humidity">
                {currentWeather?.main?.humidity}%
              </p>
            </div>
          </div>
          <div className="weather__card">
            <i className="fa-solid fa-wind" />
            <div>
              <p>Wind Speed</p>
              <p className="weather__wind">{currentWeather?.wind?.speed} m/s</p>
            </div>
          </div>
          <div className="weather__card">
            <i className="fa-solid fa-gauge-high" />
            <div>
              <p>Pressure</p>
              <p className="weather__pressure">
                {currentWeather?.main?.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
