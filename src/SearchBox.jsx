import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  // Use API key from .env file via Vite
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();
    if (response.ok && jsonResponse && jsonResponse.name) {
      setError(false);
      let result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        weather: jsonResponse.weather[0].description,
        humidity: jsonResponse.main.humidity,
        windSpeed: jsonResponse.wind.speed,
        feels_like: jsonResponse.main.feels_like,
      };
      console.log(result);
      return result;
    } else {
      setError(true);
      return null;
    }
  };

  let handleChange = (e) => {
    setCity(e.target.value);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(city);
    setCity("");
    let newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" size="small" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place Exist!</p>}
      </form>
    </div>
  );
}

export default SearchBox;
