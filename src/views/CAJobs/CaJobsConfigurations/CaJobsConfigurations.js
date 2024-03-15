import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import useFetch from "../../../core/hooks/useFetch";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { returnFieldObjects } from "./helpers";
import { CAJOBS_ROUTE, MASTER } from "../../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../../routes/routeNames";
import { NOTIFICATION_TYPES } from "../../../constant/constant";
import { initialFieldState } from "./constant";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
  const [isFieldError, setIsFieldError] = useState(true);
  const { postGlobalConfigurations } = usePostGlobalConfigurationsApi();
  const { fetchData } = useFetch({
    url: CAJOBS_ROUTE + MASTER + CONFIGURATIONS,
    otherOptions: { skipApiCallOnMount: true },
  });
  const { showNotification } = useShowNotification();

  useEffect(() => {
    const areThereEmptyFields =
      itSkills.some((obj) => obj.fieldValue === "") ||
      softSkills.some((obj) => obj.fieldValue === "");
    if (areThereEmptyFields) {
      setIsFieldError(true);
      return;
    }
    setIsFieldError(false);
  }, [itSkills, softSkills]);

  const handleCancel = () => {
    fetchData({
      queryParamsObject: {},
      onSuccessCallback: (responseFieldValues) => {
        const { it_skill, soft_skill, video_max_time } = responseFieldValues[0];
        setItSkills(returnFieldObjects({ fieldValueList: it_skill }));
        setSoftSkills(returnFieldObjects({ fieldValueList: soft_skill }));
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
    const itSkillsList = itSkills.map((obj) => obj.fieldValue);
    const softSkillsList = softSkills.map((obj) => obj.fieldValue);
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
          isActionBtnDisable={isFieldError}
          onActionBtnClick={handleSave}
          onCancelBtnClick={handleCancel}
        />
      }
    />
  );
};

export default CaJobsConfigurations;
