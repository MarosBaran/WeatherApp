import React from "react";
import classes from "./ForecastItem.module.css";
import sunnyImage from "../assets/sun.svg";
import moonImage from "../assets/moon.svg";

const ForecastItem = (props) => {
  return (
    <>
      <div className={classes.info}>
        <p>{props.date}</p>
        <p>{props.dayOfWeek}</p>
      </div>
      <div className={classes.temp}>
        <div className={classes.tempContent}>
          <img
            src={sunnyImage}
            alt="Weather Icon"
            className={classes.weatherIcon}
          />
          <p>{props.maxTemp}&deg;C</p>
        </div>
        <div className={classes.tempContent}>
          <img
            src={moonImage}
            alt="Weather Icon"
            className={classes.weatherIcon}
          />
          <p>{props.minTemp}&deg;C</p>
        </div>
      </div>
    </>
  );
};

export default ForecastItem;
