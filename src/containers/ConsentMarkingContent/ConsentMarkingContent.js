import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";

import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = () => {
  const RegistrationDates = [
    { id: 1, labeIntl: "startDateCompanies" },
    { id: 2, labeIntl: "startDateCandidates" },
    { id: 3, labeIntl: "lastDateBigCentres" },
    { id: 4, labeIntl: "lastDateSmallCentres" },
  ];

  const intl = useIntl();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <CustomGrid>
          {RegistrationDates.map((item) => {
            return (
              <CustomDateTimePicker
                type="date"
                isRequired={true}
                label={intl.formatMessage({
                  id: `label.consent.${item?.labeIntl}`,
                })}
              />
            );
          })}
        </CustomGrid>
      }
      topSectionStyle={classes.topSectionStyle}
    />
  );
};

export default ConsentMarkingContent;
