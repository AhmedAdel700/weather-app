import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Time from "./components/time/Time";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const apiKey = "047a3265c1ff9fdd7be6970f83a79b35";

    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(currentWeather, forecast);

  return (
    <main>
      <section className="content">
        <Search onSearchChange={handleOnSearchChange} />
        <Time />
        {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
      </section>
    </main>
  );
}
