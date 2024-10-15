import "./forecast.css";

export default function Forecast({ data }) {
  const futureDays = data
    ?.filter((item) => {
      const date = new Date(item.dt * 1000);
      return date.getHours() === 12; // Only take entries for 12:00 PM
    })
    .slice(0, 5); // Get only the first 5 entries after filtering for noon

  const renderForcast = futureDays?.map((day, index) => {
    return (
      <div className="weather-week" data-aos="fade-right" key={index}>
        <div className="name-of-day">
          <h3>
           {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
              new Date(day.dt * 1000)  // Convert dt to Date object
            )}
          </h3>

          <h3 className="temp-week">{Math.floor(day.main.temp - 273.15)}°C</h3>

          <div className="img-box">
            <img
              className={
                `${day.weather[0].icon}.png` === `01d.png` ||
                `${day.weather[0].icon}.png` === `13n.png` ||
                `${day.weather[0].icon}.png` === `13d.png`
                  ? "sun"
                  : "wind"
              }
              src={`../images/${day.weather[0].icon}.png`}
              alt="Weather"
            />
          </div>
        </div>

        <div className="weather-details">
          <p>
            Feels Like:
            <span>{Math.floor(day.main.feels_like - 273.15)}°C</span>
          </p>
          <p>
            Humidity: <span>{day.main.humidity}%</span>
          </p>
          <p>
            Wind Speed: <span>{day.wind.speed} mph</span>
          </p>
          <p>
            Pressure: <span>{day.main.pressure} hpa</span>
          </p>
        </div>
      </div>
    );
  });

  return <section className="forecast">{renderForcast}</section>;
}
