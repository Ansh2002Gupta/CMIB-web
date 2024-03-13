import React, { useState } from "react";
import { Button } from "antd";

import { ThreeRow } from "../../../core/layouts";

import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import { initialFieldState } from "./constant";
import styles from "./CaJobsConfigurations.module.scss";
import { classes } from "./CaJobsConfigurations.styles";
import { useIntl } from "react-intl";
import CustomButton from "../../../components/CustomButton";
import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkillsObj, setItSkillsObj] = useState(initialFieldState);
  const [softSkillsObj, setSoftSkillsObj] = useState(initialFieldState);

  //created these functions for future purpose.
  const handleCancel = () => {};
  const handleSave = () => {
    const itSkillsList = itSkillsObj.map((obj) => obj.fieldValue);
    const softSkillsList = softSkillsObj.map((obj) => obj.fieldValue);
    const videoLength = videoTimeLimit;
    console.log("payload(itSkillsList): ", itSkillsList);
    console.log("payload(softSkillsList): ", softSkillsList);
    console.log("payload(videoTimeLimit): ", videoTimeLimit);
    handlePostGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoLength,
      },
      onErrorCallback: (errMessage) => {
        console.log("error:", errMessage);
      },
      onSuccessCallback: () => {
        console.log("Success!!!!");
      },
    });
  };

  return (
    <ThreeRow
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader headerText="Global Configurations" />
        </div>
      }
      middleSection={
        <CaJobsConfigurationsContainer
          currentFieldStateItSkills={itSkillsObj}
          currentFieldStateSoftSkills={softSkillsObj}
          setCurrentFieldStateItSkills={setItSkillsObj}
          setCurrentFieldStateSoftSkills={setSoftSkillsObj}
          videoTimeLimit={videoTimeLimit}
          setVideoTimeLimit={setVideoTimeLimit}
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
