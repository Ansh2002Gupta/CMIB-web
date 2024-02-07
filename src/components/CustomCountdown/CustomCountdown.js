import React from "react";
import { Statistic } from "antd";
import "./Override.css";

const CustomCountdown = React.memo(
  ({ center = false, format, minutes, onFinish }) => {
    const { Countdown } = Statistic;

    return (
      <Countdown
        className={center && "customCount"}
        {...{ format }}
        value={new Date().setMinutes(new Date().getMinutes() + minutes)}
        onFinish={() => onFinish(minutes)}
      />
    );
  }
);

export default CustomCountdown;
