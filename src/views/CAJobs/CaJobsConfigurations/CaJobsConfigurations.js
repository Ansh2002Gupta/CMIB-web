import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { CONFIGURATIONS } from "../../../routes/routeNames";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import useFetch from "../../../core/hooks/useFetch";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import { returnFieldObjects } from "./helpers";
import { initialFieldState } from "./constant";
import { CAJOBS_ROUTE, MASTER } from "../../../constant/apiEndpoints";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const [postingSkillInfo, setPostingSkillInfo] = useState(false);
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkillsObj, setItSkillsObj] = useState(initialFieldState);
  const [softSkillsObj, setSoftSkillsObj] = useState(initialFieldState);
  const [isFieldError, setIsFieldError] = useState(false);
  const { postGlobalConfigurations } = usePostGlobalConfigurationsApi();
  const { fetchData } = useFetch({
    url: CAJOBS_ROUTE + MASTER + CONFIGURATIONS,
    otherOptions: { skipApiCallOnMount: true },
  });

  //get last saved data on component mount.
  useEffect(() => {
    getSavedProfileSkills();
  }, []);

  //enable/disable action button
  useEffect(() => {
    setIsFieldError(false);
    const isError =
      itSkillsObj.some((obj) => obj?.error) ||
      softSkillsObj.some((obj) => obj?.error);
    if (isError) setIsFieldError(true);
  }, [itSkillsObj, softSkillsObj]);

  //on cancel
  const getSavedProfileSkills = () => {
    fetchData({
      queryParamsObject: {},
      onSuccessCallback: (responseFieldValues) => {
        const { it_skill, soft_skill, video_max_time } = responseFieldValues[0];
        setItSkillsObj(returnFieldObjects({ fieldValueList: it_skill }));
        setSoftSkillsObj(returnFieldObjects({ fieldValueList: soft_skill }));
        setVideoTimeLimit(video_max_time);
      },
      onErrorCallback: (error) => {
        console.log("FETCH | error: ", error);
      },
    });
  };

  const excludeMoreThanOneEmptyField = ({ array, valueKeyName }) => {
    const arrayWithoutEmptyFields = array.filter(
      (field) => field?.[valueKeyName]
    );
    return arrayWithoutEmptyFields.length
      ? arrayWithoutEmptyFields
      : initialFieldState;
  };

  //on save
  const postProfileSKills = () => {
    setPostingSkillInfo(true);
    //check for empty field object and excluding them.
    const itSkillObjWithAtmostOneEmptyFields = excludeMoreThanOneEmptyField({
      array: itSkillsObj,
      valueKeyName: "fieldValue",
    });
    const softSkillObjWithAtmostOneEmptyFields = excludeMoreThanOneEmptyField({
      array: softSkillsObj,
      valueKeyName: "fieldValue",
    });
    const itSkillsList = itSkillObjWithAtmostOneEmptyFields.map(
      (obj) => obj?.fieldValue
    );
    const softSkillsList = softSkillObjWithAtmostOneEmptyFields.map(
      (obj) => obj?.fieldValue
    );
    postGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoTimeLimit,
      },
      onErrorCallback: (errMessage) => {
        console.log("POST | error:", errMessage);
      },
      onSuccessCallback: () => {
        setPostingSkillInfo(false);
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
          isLoading={postingSkillInfo}
          onActionBtnClick={postProfileSKills}
          onCancelBtnClick={getSavedProfileSkills}
          isActionBtnDisable={isFieldError}
        />
      }
    />
  );
};

export default CaJobsConfigurations;
