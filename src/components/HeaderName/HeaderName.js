import React from "react";
import { Typography } from "antd";

import Styles from "./HeaderName.module.scss";

const HeaderName = () => {
  return (
    <div>
      <Typography className={Styles.heading}>Hi, Samay!</Typography>
      <Typography className={Styles.subHeading}>Dashboard</Typography>
    </div>
  );
};

export default HeaderName;
