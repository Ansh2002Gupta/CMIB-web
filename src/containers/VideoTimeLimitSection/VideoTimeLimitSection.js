import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import CustomInput from "../../components/CustomInput/CustomInput";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./VideoTimeLimitSection.module.scss";

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
              customInputNumberStyles={styles.inputNumberStyle}
              max={15}
              min={0}
              onChange={(val) => setVideoTimeLimit(val)}
              type="inputNumber"
              value={videoTimeLimit}
            />
          </div>
        }
      />
    </div>
  );
};

VideoTimeLimitSection.defaultProps = {
  itSkills: [],
  setItSkills: () => {},
  setSoftSkills: () => [],
  softSkills: [],
};

VideoTimeLimitSection.propTypes = {
  itSkills: PropTypes.array,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
  softSkills: PropTypes.array,
};

export default VideoTimeLimitSection;
