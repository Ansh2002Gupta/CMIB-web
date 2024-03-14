import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { CONFIGURATIONS } from "../../../routes/routeNames";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import useFetch from "../../../core/hooks/useFetch";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { returnFieldObjects } from "./helpers";
import { CAJOBS_ROUTE, MASTER } from "../../../constant/apiEndpoints";
import { initialFieldState } from "./constant";
import { NOTIFICATION_TYPES } from "../../../constant/constant";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkillsObj, setItSkillsObj] = useState(initialFieldState);
  const [softSkillsObj, setSoftSkillsObj] = useState(initialFieldState);
  const [isFieldError, setIsFieldError] = useState(true);
  const { postGlobalConfigurations } = usePostGlobalConfigurationsApi();
  const { fetchData } = useFetch({
    url: CAJOBS_ROUTE + MASTER + CONFIGURATIONS,
    otherOptions: { skipApiCallOnMount: true },
  });
  const { showNotification, notificationContextHolder } = useShowNotification();

  useEffect(() => {
    //check for empty field object.
    const areThereEmptyFields =
      itSkillsObj.some((obj) => obj.fieldValue === "") ||
      softSkillsObj.some((obj) => obj.fieldValue === "");
    if (areThereEmptyFields) {
      setIsFieldError(true);
      return;
    }
    setIsFieldError(false);
  }, [itSkillsObj, softSkillsObj]);

  //created these functions for future purpose.
  const handleCancel = () => {
    fetchData({
      queryParamsObject: {},
      onSuccessCallback: (responseFieldValues) => {
        const { it_skill, soft_skill, video_max_time } = responseFieldValues[0];
        setItSkillsObj(returnFieldObjects({ fieldValueList: it_skill }));
        setSoftSkillsObj(returnFieldObjects({ fieldValueList: soft_skill }));
        setVideoTimeLimit(video_max_time);
      },
      onErrorCallback: (error) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.addSessionSuccessfully",
          }),
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
    });
  };

  const handleSave = () => {
    const itSkillsList = itSkillsObj.map((obj) => obj.fieldValue);
    const softSkillsList = softSkillsObj.map((obj) => obj.fieldValue);
    postGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoTimeLimit,
      },
      onErrorCallback: (errMessage) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.addSessionSuccessfully",
          }),
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({
            id: "label.addSessionSuccessfully",
          }),
          type: NOTIFICATION_TYPES.SUCCESS,
        });
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
          isActionBtnDisable={isFieldError}
        />
      }
    />
  );
};

export default CaJobsConfigurations;
