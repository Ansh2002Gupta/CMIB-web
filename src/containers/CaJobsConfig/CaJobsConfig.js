import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";
import SetProfile from "../SetProfile/index";
import VideoUpload from "../VideoUpload/index";
import styles from "./CaJobsConfig.module.scss";

const CaJobsConfig = ({ onCancel, onSave }) => {
  return (
    <div className={styles.outerContainer}>
      <TwoRow bottomSection={<SetProfile />} topSection={<VideoUpload />} />
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
