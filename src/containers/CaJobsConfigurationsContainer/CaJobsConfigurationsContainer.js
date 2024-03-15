import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfigurationsContainer = ({
  itSkills,
  setItSkills,
  setSoftSkills,
  softSkills,
  videoTimeLimit,
  setVideoTimeLimit,
}) => {
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        topSection={
          <VideoTimeLimitSection {...{ videoTimeLimit, setVideoTimeLimit }} />
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

CaJobsConfigurationsContainer.defaultProps = {
  itSkills: [],
  setItSkills: () => {},
  setSoftSkills: () => [],
  softSkills: [],
  videoTimeLimit: 0,
  setVideoTimeLimit: () => {},
};

CaJobsConfigurationsContainer.propTypes = {
  itSkills: PropTypes.array,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
  softSkills: PropTypes.array,
  videoTimeLimit: PropTypes.number,
  setVideoTimeLimit: PropTypes.func,
};

export default CaJobsConfigurationsContainer;
