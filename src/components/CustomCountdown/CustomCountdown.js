import React from "react";
import { Statistic } from "antd";

const CustomCountdown = React.memo(({ format, minutes, onFinish }) => {
  const { Countdown } = Statistic;

  return (
    <Countdown
      {...{ format }}
      value={new Date().setMinutes(new Date().getMinutes() + minutes)}
      onFinish={() => onFinish(minutes)}
    />
  );
});

export default CustomCountdown;
