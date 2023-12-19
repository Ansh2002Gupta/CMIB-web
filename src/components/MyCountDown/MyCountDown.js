import React from "react";
import { Statistic } from "antd";

const MyCountDown = React.memo(({ onFinish, format, minutes }) => {
  const { Countdown } = Statistic;
  return (
    <Countdown
      {...{ format }}
      value={new Date().setMinutes(new Date().getMinutes() + minutes)}
      onFinish={() => onFinish(minutes)}
    />
  );
});

export default MyCountDown;
