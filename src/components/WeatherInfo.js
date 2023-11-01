import classes from "./WeatherInfo.module.css";

import { motion } from "framer-motion";

const WeatherInfo = (props) => {
  const temeparute = Math.round(parseFloat(props.weatherTemp));
  const windSpeed = Math.round(parseFloat(props.weatherWind));
  const windSpeedKmh = windSpeed * 3.6;

  return (
    <>
      <motion.div
        key="weatherMain"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={classes.action}
      >
        <h1>Today</h1>
        <h5>{props.cityName}</h5>
        <h1>{temeparute}&deg;C</h1>
        <h2>{props.weatherMain}</h2>
      </motion.div>

      <motion.div
        key="weatherDesc"
        className={classes.content}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <div className={classes.desc}>
          <br></br>
          <p>
            <b>Pressure:</b>
          </p>
          <p>
            <b>Wind:</b>
          </p>
          <p>
            <b>Humidity:</b>
          </p>
        </div>
        <div className={classes.values}>
          <p>
            <b>{props.weatherPressure} hPa</b>
          </p>
          <p>
            <b> {windSpeedKmh} Km/h</b>
          </p>
          <p>
            <b>{props.weatherHumidity} %</b>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default WeatherInfo;
