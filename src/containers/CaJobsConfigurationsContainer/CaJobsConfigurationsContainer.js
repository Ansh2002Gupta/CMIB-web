import React, { useState } from "react";
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
        topSection={
          <VideoTimeLimitSection
            videoTimeLimit={videoTimeLimit}
            setVideoTimeLimit={setVideoTimeLimit}
          />
        }
        bottomSection={
          <ProfileSkills
            currentFieldStateItSkills={currentFieldStateItSkills}
            currentFieldStateSoftSkills={currentFieldStateSoftSkills}
            setCurrentFieldStateItSkills={setCurrentFieldStateItSkills}
            setCurrentFieldStateSoftSkills={setCurrentFieldStateSoftSkills}
          />
        }
      />
    </div>
  );
};

CaJobsConfig.defaultProps = {
  currentFieldStateItSkills: [],
  currentFieldStateSoftSkills: [],
  setCurrentFieldStateItSkills: () => {},
  setCurrentFieldStateSoftSkills: () => {},
};

CaJobsConfig.propTypes = {
  currentFieldStateItSkills: PropTypes.array,
  currentFieldStateSoftSkills: PropTypes.array,
  setCurrentFieldStateItSkills: PropTypes.func,
  setCurrentFieldStateSoftSkills: PropTypes.func,
};

export default CaJobsConfig;
