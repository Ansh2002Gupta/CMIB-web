import React from "react";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomInput from "../../components/CustomInput/CustomInput";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./VideoTimeLimitSection.module.scss";
import { useIntl } from "react-intl";

const VideoTimeLimitSection = ({ videoTimeLimit, setVideoTimeLimit }) => {
  const responsive = useResponsive();
  const intl = useIntl();
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        topSection={
          <Typography className={styles.topSectionHeader}>
            {intl.formatMessage({
              id: "label.set_max_video_upload_time_limit",
            })}
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
              {intl.formatMessage({
                id: "label.max_video_upload_time_limit",
              })}
            </Typography>
            <CustomInput
              controls={true}
              min={0}
              max={15}
              type="inputNumber"
              value={videoTimeLimit}
              onChange={(val) => setVideoTimeLimit(val)}
              customInputNumberStyles={styles.inputNumberStyle}
            />
          </div>
        }
      />
    </div>
  );
};

export default VideoTimeLimitSection;
