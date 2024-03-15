import React, { useState, useEffect, useRef, useContext } from "react";
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
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import { NotificationContext } from "../../../globalContext/notification/notificationProvider";
import { setShowSuccessNotification } from "../../../globalContext/notification/notificationActions";
import useShowNotification from "../../../core/hooks/useShowNotification";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const previousSavedData = useRef();
  const [postingSkillInfo, setPostingSkillInfo] = useState(false);
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
  const [isFieldError, setIsFieldError] = useState(false);
  const { postGlobalConfigurations } = usePostGlobalConfigurationsApi();
  const { isLoading, fetchData } = useFetch({
    url: CAJOBS_ROUTE + MASTER + CONFIGURATIONS,
    otherOptions: { skipApiCallOnMount: true },
  });
  const { showNotification, notificationContextHolder } = useShowNotification();

  useEffect(() => {
    getSavedProfileSkills();
  }, []);

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

  const removeInBetweenEmptyFields = ({ array, valueKeyName }) => {
    const arrayWithoutEmptyFields = array.filter((field, index) =>
      index !== array.length - 1 ? !!field?.[valueKeyName] : true
    );
    return arrayWithoutEmptyFields;
  };

  const addEmptyRowAtLastIfAbsent = ({ array, valueKeyName }) => {
    let updatedArray = array.map((field, index) => {
      if (index === array.length - 1) {
        return !!field?.[valueKeyName]
          ? { ...field, buttonType: "remove" }
          : field;
      } else return field;
    });
    if (updatedArray[updatedArray.length - 1]?.buttonType?.trim() === "remove")
      updatedArray.push({
        fieldValue: "",
        buttonType: "add",
        id: Date.now(),
      });
    return updatedArray;
  };

  //on save
  const postProfileSkills = ({ keyName }) => {
    setPostingSkillInfo(true);
    //checking and removing empty fields and keeping atmost one empty field if all fields were removed.
    const itSkillsWithAtmostOneEmptyField = removeInBetweenEmptyFields({
      array: itSkills,
      valueKeyName: keyName,
    });
    const softSkillsWithAtmostOneEmptyField = removeInBetweenEmptyFields({
      array: softSkills,
      valueKeyName: keyName,
    });
    const updatedItSkills = addEmptyRowAtLastIfAbsent({
      array: itSkillsWithAtmostOneEmptyField,
      valueKeyName: keyName,
    });
    const updatedSoftSkills = addEmptyRowAtLastIfAbsent({
      array: softSkillsWithAtmostOneEmptyField,
      valueKeyName: keyName,
    });
    //update the useRef 'previousSavedData' with the current Data.
    previousSavedData.current = {
      previousSavedItSkills: updatedItSkills,
      previousSavedSoftSkills: updatedSoftSkills,
      previousSavedVideoTimeLimit: videoTimeLimit,
    };
    const itSkillsList = updatedItSkills.map((obj) =>
      !!obj?.[keyName] ? obj?.[keyName] : ""
    );
    const softSkillsList = updatedSoftSkills.map((obj) =>
      !!obj?.[keyName] ? obj?.[keyName] : ""
    );
    postGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoTimeLimit,
      },
      //TODO: TO DESIGN THE ERROR LOGIC
      onErrorCallback: (errMessage) => {},
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.data_saved_successfully" }),
          type: "success",
        });
        setPostingSkillInfo(false);
        initializeWithPreviousSavedData();
      },
    });
  };

  //on cancel
  const initializeWithPreviousSavedData = () => {
    setItSkills(previousSavedData.current.previousSavedItSkills);
    setSoftSkills(previousSavedData.current.previousSavedSoftSkills);
    setVideoTimeLimit(previousSavedData.current.previousSavedVideoTimeLimit);
  };

  return (
    <>
      {notificationContextHolder}
      <ThreeRow
        topSection={
          <div className={styles.headerContainer}>
            <ContentHeader headerText="Global Configurations" />
          </div>
        }
        middleSection={
          isLoading ? (
            <CustomLoader />
          ) : (
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
          )
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
            onActionBtnClick={() =>
              postProfileSkills({ keyName: "fieldValue" })
            }
            onCancelBtnClick={initializeWithPreviousSavedData}
          />
        }
      />
    </>
  );
};

export default CaJobsConfigurations;
