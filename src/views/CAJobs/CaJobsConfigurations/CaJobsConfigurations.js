import React, { useState, useEffect, useRef } from "react";
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
  const previousSavedData = useRef();
  const [postingSkillInfo, setPostingSkillInfo] = useState(false);
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
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

  //initialize field with last saved data on component mount.
  const getSavedProfileSkills = () => {
    fetchData({
      queryParamsObject: {},
      onSuccessCallback: (responseFieldValues) => {
        const { it_skill, soft_skill, video_max_time } = responseFieldValues[0];
        previousSavedData.current = {
          previousSavedItSkills: returnFieldObjects({
            fieldValueList: it_skill,
          }),
          previousSavedSoftSkills: returnFieldObjects({
            fieldValueList: soft_skill,
          }),
          previousSavedVideoTimeLimit: video_max_time || 0,
        };
        setItSkills(previousSavedData.current.previousSavedItSkills);
        setSoftSkills(previousSavedData.current.previousSavedSoftSkills);
        setVideoTimeLimit(
          previousSavedData.current.previousSavedVideoTimeLimit
        );
      },
      //TODO: TO DESIGN THE ERROR LOGIC
      onErrorCallback: (error) => {},
    });
  };

  //to enable/disable action button.
  useEffect(() => {
    setIsFieldError(false);
    const isError =
      itSkills.some((obj) => obj?.error) ||
      softSkills.some((obj) => obj?.error);
    if (isError) setIsFieldError(true);
  }, [itSkills, softSkills]);

  const removeEmptyFields = ({ array, valueKeyName }) => {
    console.log("array:", array);
    const arrayWithoutEmptyFields = array.filter(
      (field) => field?.[valueKeyName]
    );
    console.log("arrayWithoutEmptyFields:", arrayWithoutEmptyFields);
    // keeping atmost one empty field if all fields were filtered.
    return arrayWithoutEmptyFields.length
      ? arrayWithoutEmptyFields
      : initialFieldState;
  };

  //on save
  const postProfileSkills = ({ keyName }) => {
    setPostingSkillInfo(true);
    //checking and removing empty fields and keeping atmost one empty field if all fields were removed.
    const itSkillsWithAtmostOneEmptyField = removeEmptyFields({
      array: itSkills,
      valueKeyName: keyName,
    });
    const softSkillsWithAtmostOneEmptyField = removeEmptyFields({
      array: softSkills,
      valueKeyName: keyName,
    });
    //update the useRef 'previousSavedData' with the current Data.
    previousSavedData.current = {
      previousSavedItSkills: itSkillsWithAtmostOneEmptyField,
      previousSavedSoftSkills: softSkillsWithAtmostOneEmptyField,
      previousSavedVideoTimeLimit: videoTimeLimit,
    };
    initializeWithPreviousSavedData();
    const itSkillsList = itSkillsWithAtmostOneEmptyField.map(
      (obj) => obj?.[keyName]
    );
    const softSkillsList = softSkillsWithAtmostOneEmptyField.map(
      (obj) => obj?.[keyName]
    );
    postGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoTimeLimit,
      },
      //TODO: TO DESIGN THE ERROR LOGIC
      onErrorCallback: (errMessage) => {},
      onSuccessCallback: () => setPostingSkillInfo(false),
    });
  };

  //on cancel
  const initializeWithPreviousSavedData = () => {
    setItSkills(previousSavedData.current.previousSavedItSkills);
    setSoftSkills(previousSavedData.current.previousSavedSoftSkills);
    setVideoTimeLimit(previousSavedData.current.previousSavedVideoTimeLimit);
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
          isLoading={postingSkillInfo}
          isActionBtnDisable={isFieldError}
          onActionBtnClick={() => postProfileSkills({ keyName: "fieldValue" })}
          onCancelBtnClick={initializeWithPreviousSavedData}
        />
      }
    />
  );
};

export default CaJobsConfigurations;
