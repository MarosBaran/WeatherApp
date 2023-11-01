import Modal from "../UI/Modal";
import React from "react";
import classes from "./ForecastDetail.module.css";

const ForecastDetail = (props) => {
  const forecastDetail = props.forecastDetail;
  return (
    <Modal onClose={props.onClose}>
      <h2>{forecastDetail.transformedDate}</h2>
      <p style={{ fontWeight: "bold", textAlign: "center" }}>
        {forecastDetail.summary}
      </p>

      <div className={classes.container}>
        <div className={classes.desc}>
          <p>Sunrise:</p>
          <p>Sunset:</p>
          <p>Pressure:</p>
          <p>Humidity:</p>
          <p>Wind Speed:</p>
        </div>
        <div className={classes.content}>
          <p>{forecastDetail.sunriseTime + " am"}</p>
          <p>{forecastDetail.sunsetTime + " pm"}</p>
          <p>{forecastDetail.pressure + " hPa"}</p>
          <p>{forecastDetail.humidity + " %"}</p>
          <p>{forecastDetail.windSpeed + " Km/h"}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ForecastDetail;
