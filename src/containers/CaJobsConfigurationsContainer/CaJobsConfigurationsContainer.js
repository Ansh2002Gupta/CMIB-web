import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import { MODULE_KEYS } from "../../constant/constant";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfigurationsContainer = ({
  itSkills,
  selectedModule,
  setItSkills,
  setSoftSkills,
  setVideoTimeLimitError,
  setVideoTimeLimit,
  softSkills,
  videoTimeLimit,
  videoTimeLimitError,
}) => {
  return (
    <div
      className={`${styles.fullWidth} ${
        selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY
          ? styles.outerContainer
          : styles.otherOutercontainer
      }`}
    >
      <TwoRow
        topSection={
          selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY ? (
            <VideoTimeLimitSection
              {...{
                setVideoTimeLimit,
                setVideoTimeLimitError,
                videoTimeLimit,
                videoTimeLimitError,
              }}
            />
          ) : (
            <></>
          )
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
  selectedModule: PropTypes.object,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
  softSkills: PropTypes.array,
  videoTimeLimit: PropTypes.number,
  setVideoTimeLimit: PropTypes.func,
};

export default CaJobsConfigurationsContainer;
