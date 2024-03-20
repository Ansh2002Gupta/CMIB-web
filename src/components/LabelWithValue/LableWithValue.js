import React from "react";
import { Typography } from "antd";

import commonStyles from "../../common/commonStyles.module.scss";

const LabelWithValue = ({ heading, subHeading, isMandatory = false }) => {
  return (
    <div>
      <Typography className={commonStyles.commonLabelStyle}>
        {heading}
        {isMandatory && <span className={commonStyles.redText}>*</span>}
      </Typography>
      <Typography className={commonStyles.commonSubHeadingStyle}>
        {subHeading}
      </Typography>
    </div>
  );
};

export default LabelWithValue;
