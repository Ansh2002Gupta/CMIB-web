import React from "react";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../../components/Chip/Chip";
import styles from "./IconHeader.module.scss";

const IconHeader = () => {
  return (
    <TwoColumn
      className={styles.mainContainer}
      leftSection={
        <TwoColumn
          leftSection={<Typography>T0123456</Typography>}
          rightSection={<Chip label={"pending"} />}
        />
      }
      rightSection={<></>}
    />
  );
};

export default IconHeader;
