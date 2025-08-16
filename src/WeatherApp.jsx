import React, { useState } from "react";
import "./WeatherApp.css";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "pune",
    weather: "haze",
    temp: 30,
    tempMin: 25,
    tempMax: 35,
    humidity: 70,
    windSpeed: 10,
    feellike: 25.35,
  });
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  return (
    <div className="WeatherApp">
      <h2>Weather App</h2>
      <SearchBox updateInfo={updateInfo} />
      <br />
      <InfoBox info={weatherInfo} />
    </div>
  );
}

export default WeatherApp;
