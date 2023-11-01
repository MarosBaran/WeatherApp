import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  let cardClasses = classes.card;

  if (props.children && props.children.type.name === "LoadingIndicator") {
    cardClasses += ` ${classes.centered}`;
  }

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
