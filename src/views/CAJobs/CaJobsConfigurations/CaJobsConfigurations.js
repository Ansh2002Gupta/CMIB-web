import React, { useState } from "react";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import { initialFieldState } from "./constant";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);

  //TODO: created these functions for future purpose.
  const handleCancel = () => {};
  const handleSave = () => {};

  return (
    <ThreeRow
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader headerText="Global Configurations" />
        </div>
      }
      middleSection={
        <CaJobsConfigurationsContainer
          {...{
            itSkills,
            setItSkills,
            setSoftSkills,
            softSkills,
            videoTimeLimit,
            setVideoTimeLimit,
          }}
        />
      }
      middleSectionStyle={classes.middleSection}
      bottomSection={
        <ActionAndCancelButtons
          actionBtnText={intl.formatMessage({
            id: "label.save",
          })}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          customActionBtnStyles={styles.saveButton}
          customContainerStyles={styles.buttonWrapper}
          onActionBtnClick={handleSave}
          onCancelBtnClick={handleCancel}
        />
      }
    />
  );
};

export default CaJobsConfigurations;
