import React, { useState } from "react";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./VideoTimeLimitSection.module.scss";

const VideoTimeLimitSection = () => {
  const responsive = useResponsive();
  const [value, setValue] = useState(0);
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        topSection={
          <Typography className={styles.topSectionHeader}>
            Setup Maximum Video Upload Time Limit
          </Typography>
        }
        bottomSection={
          <div
            className={
              (styles.outerFlexColWrapper,
              responsive.isSm ? styles.width_350 : styles.width_200)
            }
          >
            <Typography className={styles.topSectionLabel}>
              Maximum Video Upload Time Limit
            </Typography>
            <CustomInput
              controls={true}
              min={0}
              max={15}
              type="inputNumber"
              value={value}
              onChange={(val) => {
                console.log("Changed value:", val);
                setValue(val);
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default VideoTimeLimitSection;
