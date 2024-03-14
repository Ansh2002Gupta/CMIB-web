import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import MultiRowInput from "../../components/MultiRowInput/MultiRowInput";
import useResponsive from "../../core/hooks/useResponsive";
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
                  inputFields={itSkills}
                  setInputFields={setItSkills}
                  headerText={intl?.formatMessage({
                    id: "label.headerTextItSkills",
                  })}
                  valueKeyName="fieldValue"
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderItSkills",
                  })}
                />
              }
              leftSectionClassName={styles.leftSectionStyling}
              rightSection={
                <MultiRowInput
                  inputFields={softSkills}
                  setInputFields={setSoftSkills}
                  headerText={intl?.formatMessage({
                    id: "label.headerTextSoftSkills",
                  })}
                  valueKeyName="fieldValue"
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderSoftSkills",
                  })}
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

export default ProfileSkills;
