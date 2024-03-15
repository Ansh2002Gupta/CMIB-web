import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import useFetch from "../../../core/hooks/useFetch";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import useShowNotification from "../../../core/hooks/useShowNotification";
import { returnFieldObjects } from "./helpers";
import { initialFieldState } from "./constant";
import { CAJOBS_ROUTE, MASTER } from "../../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../../routes/routeNames";
import { NOTIFICATION_TYPES } from "../../../constant/constant";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const previousSavedData = useRef();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
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
      onErrorCallback: (error) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.errorOccured",
          }),
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
    });
  };

  const removeInBetweenEmptyFields = ({ array, valueKeyName }) => {
    const arrayWithoutEmptyFields = array.filter((field, index) =>
      index !== array.length - 1 ? !!field?.[valueKeyName] : true
    );
    return arrayWithoutEmptyFields;
  };

  const addEmptyRowAtLastIfAbsent = ({
    array,
    valueKeyName,
    actionKeyName,
  }) => {
    let updatedArray = array.map((field, index) => {
      if (index === array.length - 1) {
        return !!field?.[valueKeyName]
          ? { ...field, [actionKeyName]: "remove" }
          : field;
      } else return field;
    });
    if (
      updatedArray[updatedArray.length - 1]?.[actionKeyName]?.trim() ===
      "remove"
    )
      updatedArray.push({
        [valueKeyName]: "",
        [actionKeyName]: "add",
        id: Date.now(),
      });
    return updatedArray;
  };

  const postProfileSkills = ({ keyName }) => {
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
      actionKeyName: "buttonType",
    });
    const updatedSoftSkills = addEmptyRowAtLastIfAbsent({
      array: softSkillsWithAtmostOneEmptyField,
      valueKeyName: keyName,
      actionKeyName: "buttonType",
    });
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
      onErrorCallback: (errMessage) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.errorOccured",
          }),
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.data_saved_successfully" }),
          type: "success",
        });
      },
    });
    initializeWithPreviousSavedData();
  };

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
            isLoading={isLoading}
            isActionBtnDisable={
              itSkills.some((obj) => obj?.error) ||
              softSkills.some((obj) => obj?.error)
            }
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
