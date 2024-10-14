import { WiDaySunny } from "weather-icons-react";
import "./current-weather.css";

export default function CurrentWeather({ currentWeather }) {
  return (
    <section className="current-weather">
      <div className="city-info">
        <div>
          <h1 className="city-name">{currentWeather.city}</h1>
          <h3 className="weather-condition">
            <span>{currentWeather.name}</span>
            <br />
            <span>Weather :</span> {currentWeather.weather[0].description}
          </h3>
        </div>

        <div>
          <img
            className={
              `${currentWeather.weather[0].icon}.png` === `01d.png` ||
              `${currentWeather.weather[0].icon}.png` === `13n.png` ||
              `${currentWeather.weather[0].icon}.png` === `13d.png`
                ? "sun"
                : "wind"
            }
            src={`../images/${currentWeather.weather[0].icon}.png`}
            alt="Weather"
          />
        </div>
      </div>

      <div className="weather-info">
        <p className="temp">
          {Math.floor(currentWeather.main.temp - 273.15)}°C
        </p>
        <div className="details">
          <p className="feels">
            Feels Like:
            <span>{Math.floor(currentWeather.main.feels_like - 273.15)}°C</span>
          </p>
          <p className="humidity">
            Humidity: <span>{currentWeather.main.humidity}%</span>
          </p>
          <p className="wind-speed">
            Wind Speed: <span>{currentWeather.wind.speed} mph</span>
          </p>
          <p className="pressure">
            Pressure: <span>{currentWeather.main.pressure} hpa</span>
          </p>
        </div>
      </div>
    </section>
  );
}
