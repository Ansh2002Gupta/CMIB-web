import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import PropTypes from "prop-types";

import { TwoColumn, TwoRow } from "../../core/layouts";

import MultiRowInput from "../../components/MultiRowInput/MultiRowInput";
import useResponsive from "../../core/hooks/useResponsive";
import { MAX_INPUT_LENGTH } from "../../constant/constant";
import styles from "./ProfileSkills.module.scss";

const ProfileSkills = ({
  itSkills,
  setItSkills,
  setSoftSkills,
  softSkills,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.outerContainer}>
      <TwoRow
        bottomSection={
          <div className={styles.twoColumnWrapper}>
            <TwoColumn
              className={`${styles.twoColumnStyling} ${
                responsive.isMd
                  ? styles.flexDirectionRow
                  : styles.flexDirectionCol
              }`}
              leftSection={
                <MultiRowInput
                  headerText={intl?.formatMessage({
                    id: "label.headerTextItSkills",
                  })}
                  inputFields={itSkills}
                  maxInputLength={MAX_INPUT_LENGTH}
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderItSkills",
                  })}
                  setInputFields={setItSkills}
                  valueKeyName="fieldValue"
                />
              }
              leftSectionClassName={styles.leftSectionStyling}
              rightSection={
                <MultiRowInput
                  headerText={intl?.formatMessage({
                    id: "label.headerTextSoftSkills",
                  })}
                  inputFields={softSkills}
                  maxInputLength={MAX_INPUT_LENGTH}
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderSoftSkills",
                  })}
                  setInputFields={setSoftSkills}
                  valueKeyName="fieldValue"
                />
              }
              rightSectionClassName={styles.rightSectionStyling}
            />
          </div>
        }
        topSection={
          <Typography className={styles.topSectionHeader}>
            {intl.formatMessage({ id: "label.set_profile_skills" })}
          </Typography>
        }
      />
    </div>
  );
};

ProfileSkills.defaultProps = {
  itSkills: [],
  setItSkills: () => {},
  setSoftSkills: () => [],
  softSkills: [],
};

ProfileSkills.propTypes = {
  itSkills: PropTypes.array,
  setItSkills: PropTypes.func,
  setSoftSkills: PropTypes.func,
  softSkills: PropTypes.array,
};

export default ProfileSkills;
