import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../util/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActions } from "../store/fetch-slice";
import WeatherInfo from "./WeatherInfo";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import Card from "../UI/Card";

const Weather = (props) => {
  const weatherInfo = useSelector((state) => state.weatherInfo);
  const locationState = useSelector((state) => state.locationState);
  const city = useSelector((state) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    if (locationState) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          fetchActions.setWeatherInfo({
            lon: longitude,
            lat: latitude,
          })
        );
      });
    }
  }, [locationState, dispatch]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", weatherInfo, city],
    queryFn: ({ signal }) => fetchWeather({ signal, weatherInfo, city }),
    enabled: !!city || !!weatherInfo,
  });

  let content = (
    <p>Type in city or search your location to show weather info</p>
  );

  if (isLoading && (!!weatherInfo || !!city)) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Coldnt fetch data for weather info"}
      />
    );
  }
  if (data) {
    content = (
      <>
        <WeatherInfo
          cityName={data.name}
          weatherMain={data.weather[0].main}
          weatherDescription={data.weather[0].description}
          weatherTemp={data.main.temp}
          weatherPressure={data.main.pressure}
          weatherWind={data.wind.speed}
          weatherHumidity={data.main.humidity}
        />
      </>
    );
  }

  return <Card>{content}</Card>;
};

export default Weather;
