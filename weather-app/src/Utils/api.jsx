const API_KEY = "29172e6c30fce9b8c120d29607f08c80";

export const getWeatherEndpoint = (city, unit = "metric") => {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&cnt=5&appid=${API_KEY}`;
};

// export const getWeatherEndpoint = (city, unit = "metric") => {
//   return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;
// };
