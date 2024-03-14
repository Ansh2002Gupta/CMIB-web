import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfig = ({
  currentFieldStateItSkills,
  currentFieldStateSoftSkills,
  setCurrentFieldStateItSkills,
  setCurrentFieldStateSoftSkills,
  videoTimeLimit,
  setVideoTimeLimit,
}) => {
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        bottomSection={
          <ProfileSkills
            currentFieldStateItSkills={currentFieldStateItSkills}
            currentFieldStateSoftSkills={currentFieldStateSoftSkills}
            setCurrentFieldStateItSkills={setCurrentFieldStateItSkills}
            setCurrentFieldStateSoftSkills={setCurrentFieldStateSoftSkills}
          />
        }
        topSection={
          <VideoTimeLimitSection
            videoTimeLimit={videoTimeLimit}
            setVideoTimeLimit={setVideoTimeLimit}
          />
        }
      />
    </div>
  );
};

CaJobsConfig.defaultProps = {};

CaJobsConfig.propTypes = {};

export default CaJobsConfig;
