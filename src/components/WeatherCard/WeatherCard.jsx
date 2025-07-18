import "./WeatherCard.css";
import { weatherTypes, defaultWeatherTypes } from "../../utils/constants";
import sunny from "../../assets/sunny.png";
function WeatherCard({ weatherData }) {
  const filterType = weatherTypes.filter((type) => {
    return (
      type.day === weatherData.isDay && type.condition === weatherData.condition
    );
  });

  let weatherType;
  if (filterType.length === 0) {
    weatherType = defaultWeatherTypes[weatherData.isDay ? "day" : "night"];
  } else {
    weatherType = filterType[0];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F </p>
      <img
        src={weatherTypes?.url}
        alt="Weather"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
