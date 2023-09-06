import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const WeatherInfo = ({ capitalName, capitalLat, capitalLng }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countriesService.getWeather(capitalLat, capitalLng).then((response) => {
      setWeatherData(response);
    }).catch(() => {return <h1>Weather not accessible</h1>});
  }, []);

  if (weatherData != null) {
    return (
      <>
        <h1>Weather in {capitalName}</h1>
        <div>Temperature: {Math.round((weatherData.current.temp - 273.15) * 100) / 100}&deg; C</div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} />
        <div>Wind: {weatherData.current.wind_speed} m/s at {weatherData.current.wind_deg}&deg;</div>
      </>
    );
  }

  return <div>Loading weather data...</div>;
};

export default WeatherInfo;
