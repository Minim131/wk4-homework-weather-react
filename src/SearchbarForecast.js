import React, { useState } from "react";
import axios from "axios";
import "./SearchbarForecast.css";
import CountryDateTime from "./CountryDateTime";
import IconTempHumidWind from "./IconTempHumidWind";
import WeekForecast from "./WeekForecast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar() {
  const [city, setCity] = useState("australia");
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      country: response.data.name,
      date: new Date(response.data.dt * 1000),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function updateCity(event) {
    // event.preventDefault();
    setCity(event.target.value);
  }

  function search() {
    // let apiKey = `87675437846ea8c4242459c1be7a1969`;
    let apiKey = `4c7756cb000c7f0ee92c930c2b6efd59`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  //current location
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `4c7756cb000c7f0ee92c930c2b6efd59`;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(handleResponse);
  }

  function currentButton(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  if (weatherData.ready) {
    return (
      <div className="Searchbar">
        <form className="top" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" Enter a city here!"
            className="city-search"
            autoFocus="on"
            onChange={updateCity}
          />
          <input type="submit" className="submit-button" />
          <button className="current-button" onClick={currentButton}>
            <FontAwesomeIcon icon={faLocationDot} />
          </button>
        </form>
        <br />
        <CountryDateTime forecastData={weatherData} />
        <IconTempHumidWind forecastData={weatherData} />
        <WeekForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "loading...";
  }
}
