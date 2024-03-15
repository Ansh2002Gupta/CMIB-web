import React, { useState } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfig = ({
  itSkills,
  softSkills,
  setItSkills,
  setSoftSkills,
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
            {...{
              itSkills,
              softSkills,
              setItSkills,
              setSoftSkills,
            }}
          />
        }
      />
    </div>
  );
};

CaJobsConfig.defaultProps = {
  itSkills: [],
  softSkills: [],
  setItSkills: () => {},
  setSoftSkills: () => {},
};

CaJobsConfig.propTypes = {
  itSkills: PropTypes.array,
  softSkills: PropTypes.array,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
};

export default CaJobsConfig;
