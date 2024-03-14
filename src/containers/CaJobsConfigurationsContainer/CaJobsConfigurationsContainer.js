import React from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import styles from "./CaJobsConfigurationsContainer.module.scss";

const CaJobsConfig = ({
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
        topSection={
          <VideoTimeLimitSection {...{ videoTimeLimit, setVideoTimeLimit }} />
        }
      />
    </div>
  );
};

CaJobsConfig.defaultProps = {};

CaJobsConfig.propTypes = {};

export default CaJobsConfig;
