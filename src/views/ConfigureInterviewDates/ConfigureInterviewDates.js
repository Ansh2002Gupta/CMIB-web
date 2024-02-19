import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import ConfigureInterview from "../../containers/ConfigureInterview";
import styles from "./ConfigureInterviewDates.module.scss";
import { classes } from "./ConfigureInterviewDate.styles";

const ConfigureInterviewDates = () => {
  const intl = useIntl();

  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText={intl.formatMessage({
            id: "label.configureInterviewDates",
          })}
          isLeftFillSpace={true}
          customStyles={styles.headerCustomStyles}
          customContainerStyle={styles.parentContainer}
        />
      }
      bottomSection={<ConfigureInterview />}
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};

export default ConfigureInterviewDates;
