import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import { MODULE_KEYS } from "../../constant/constant";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfig = ({
  itSkills,
  selectedModule,
  setItSkills,
  setSoftSkills,
  softSkills,
  videoTimeLimit,
  setVideoTimeLimit,
}) => {
  return (
    <div
      className={`${styles.fullWidth} ${
        selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY
          ? styles.outerContainer
          : ""
      }`}
    >
      <TwoRow
        topSection={
          selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY ? (
            <VideoTimeLimitSection {...{ setVideoTimeLimit, videoTimeLimit }} />
          ) : (
            <></>
          )
        }
        bottomSection={
          <ProfileSkills
            {...{
              itSkills,
              setItSkills,
              setSoftSkills,
              softSkills,
            }}
          />
        }
      />
    </div>
  );
};

CaJobsConfig.defaultProps = {
  itSkills: [],
  setItSkills: () => {},
  setSoftSkills: () => [],
  softSkills: [],
  videoTimeLimit: 0,
  setVideoTimeLimit: () => {},
};

CaJobsConfig.propTypes = {
  itSkills: PropTypes.array,
  selectedModule: PropTypes.object,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
  softSkills: PropTypes.array,
  videoTimeLimit: PropTypes.number,
  setVideoTimeLimit: PropTypes.func,
};

export default CaJobsConfig;
