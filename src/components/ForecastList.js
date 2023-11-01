import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "../util/http";
import { useSelector } from "react-redux";
import ForecastItem from "./ForecastItem";
import classes from "./ForecastList.module.css";
import LoadingIndicator from "../UI/LoadingIndicator";

import { motion } from "framer-motion";
import { useState } from "react";
import ForecastDetail from "./ForecastDetail";

const ForecastList = () => {
  const weatherInfo = useSelector((state) => state.weatherInfo);
  const city = useSelector((state) => state.city);
  const [forecastDetail, setForecastDetail] = useState("");

  const [modalClicked, setModalClicked] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["forecast", weatherInfo, city],
    queryFn: ({ signal }) => fetchForecast({ signal, weatherInfo, city }),
    enabled: !!city || !!weatherInfo,
  });

  const openModalHandler = (item) => {
    setForecastDetail(item);
    setModalClicked(true);
  };

  const closeModalHandler = () => {
    setModalClicked(false);
  };

  let content;

  if (isLoading && (!!weatherInfo || !!city)) {
    content = <LoadingIndicator />;
  }

  if (data) {
    content = data.map((item) => {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [0.8, 1.3, 1] }}
          className={classes.forecastItem}
          onClick={() => openModalHandler(item)}
          key={item.date}
        >
          <ForecastItem
            date={item.transformedDate}
            dayOfWeek={item.dayOfWeek}
            minTemp={item.minTemp}
            maxTemp={item.maxTemp}
            key={item.date}
          />
        </motion.div>
      );
    });
  }

  return (
    <div className={classes.forecastListContainer}>
      {modalClicked && (
        <ForecastDetail
          onClose={closeModalHandler}
          forecastDetail={forecastDetail}
        />
      )}
      {content}
    </div>
  );
};

export default ForecastList;
