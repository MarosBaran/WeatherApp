import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const fetchWeather = async ({ signal, weatherInfo, city }) => {
  let url = "";
  const lat = weatherInfo.lat;
  const lon = weatherInfo.lon;
  if (city.city !== undefined) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=decea1cc111b15ba4e6021297c73e9e5&units=metric`;
  } else if (weatherInfo !== null) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=decea1cc111b15ba4e6021297c73e9e5&units=metric`;
  }

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { weather, main, wind, name } = await response.json();
  return { weather: weather, main: main, wind: wind, name: name };
};

const getCity = async (city) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=decea1cc111b15ba4e6021297c73e9e5`
  );
  if (!response.ok) {
    const error = new Error("An error occurred while fetching forecast data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  const lat = data[0].lat;
  const lon = data[0].lon;

  return { lat, lon };
};

export const fetchForecast = async ({ signal, weatherInfo, city }) => {
  let url = "";
  const lat = weatherInfo.lat;
  const lon = weatherInfo.lon;
  if (city.city !== undefined) {
    const CityLatLon = await getCity(city.city);
    if (CityLatLon) {
      url = `https://api.openweathermap.org/data/3.0/onecall?lat=${CityLatLon.lat}&lon=${CityLatLon.lon}&exclude=hourly,minutely&units=metric&appid=decea1cc111b15ba4e6021297c73e9e5`;
    }
  } else if (weatherInfo !== null) {
    url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=decea1cc111b15ba4e6021297c73e9e5`;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching forecast data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { daily } = await response.json();

  return processForecastData(daily);
};

const processForecastData = (forecastData) => {
  const restForecastData = forecastData.slice(1);

  const extractedForecast = restForecastData.map((item) => {
    const {
      dt,
      summary,
      temp,
      pressure,
      humidity,
      sunrise,
      sunset,
      wind_speed,
    } = item;

    const windSpeed = Math.round(wind_speed * 3.6);

    const date = new Date(dt * 1e3);
    const sunriseFormatted = new Date(sunrise * 1e3);
    const sunriseHours = sunriseFormatted.getHours();
    const sunriseMinutes =
      sunriseFormatted.getMinutes() < 10
        ? "0" + sunriseFormatted.getMinutes()
        : sunriseFormatted.getMinutes();
    const sunriseTime = sunriseHours + ":" + sunriseMinutes;

    const sunsetFormatted = new Date(sunset * 1e3);
    const sunsetHours = sunsetFormatted.getHours();
    const sunsetMinutes =
      sunsetFormatted.getMinutes() < 10
        ? "0" + sunsetFormatted.getMinutes()
        : sunsetFormatted.getMinutes();
    const sunsetTime = sunsetHours + ":" + sunsetMinutes;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const transformedDate = day + "/" + month + "/" + year;
    const maxTemp = Math.round(temp.max);
    const minTemp = Math.round(temp.min);

    const dayOfWeek = daysOfWeek[date.getDay()];

    return {
      transformedDate,
      date,
      summary,
      maxTemp,
      minTemp,
      dayOfWeek,
      pressure,
      humidity,
      sunriseTime,
      sunsetTime,
      windSpeed,
    };
  });

  return extractedForecast;
};
