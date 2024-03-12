import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import ProfileSkills from "../ProfileSkills/index";
import VideoTimeLimitSection from "../VideoTimeLimitSection/index";
import styles from "./CaJobsConfig.module.scss";

const CaJobsConfig = ({ onCancel, onSave }) => {
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        bottomSection={<ProfileSkills />}
        topSection={<VideoTimeLimitSection />}
      />
      <div className={styles.buttonWrapper}>
        <Button onClick={() => onCancel()} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={() => onSave()} className={styles.saveButton}>
          Save
        </Button>
      </div>
    </div>
  );
};

CaJobsConfig.defaultProps = {
  onCancel: () => {},
  onSave: () => {},
};

CaJobsConfig.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default CaJobsConfig;
