import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { ThreeRow } from "../../../core/layouts";

import ActionAndCancelButtons from "../../../components/ActionAndCancelButtons";
import CaJobsConfigurationsContainer from "../../../containers/CaJobsConfigurationsContainer";
import ContentHeader from "../../../containers/ContentHeader";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../../components/ErrorMessageBox";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../../core/hooks/useFetch";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import useShowNotification from "../../../core/hooks/useShowNotification";
import {
  addEmptyRowAtLastIfAbsent,
  removeInBetweenEmptyFields,
  returnFieldObjects,
} from "./helpers";
import { initialFieldState } from "./constant";
import { MASTER } from "../../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../../routes/routeNames";
import {
  MAX_VIDEO_LENGTH,
  MIN_VIDEO_LENGTH,
  MODULE_KEYS,
  NOTIFICATION_TYPES,
} from "../../../constant/constant";
import { classes } from "./CaJobsConfigurations.styles";
import styles from "./CaJobsConfigurations.module.scss";

const CaJobsConfigurations = () => {
  const intl = useIntl();
  const previousSavedData = useRef();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const [videoTimeLimit, setVideoTimeLimit] = useState(1);
  const [videoTimeLimitError, setVideoTimeLimitError] = useState("");
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
  const { isLoading: isSavingConfigurations, postGlobalConfigurations } =
    usePostGlobalConfigurationsApi(selectedModule);
  const {
    error: errorGettingConfigurations,
    fetchData,
    isLoading,
    isSuccess: isGettingConfigurationsSuccessful,
  } = useFetch({
    url: selectedModule?.key + MASTER + CONFIGURATIONS,
    otherOptions: { skipApiCallOnMount: true },
  });
  const { showNotification, notificationContextHolder } = useShowNotification();

  const getSavedProfileSkills = () => {
    fetchData({
      queryParamsObject: {},
      onSuccessCallback: (responseFieldValues) => {
        const { it_skill, soft_skill, video_max_time } =
          responseFieldValues?.[0] || {};
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
    });
  };

  useEffect(() => {
    if (selectedModule?.key) {
      getSavedProfileSkills();
    }
  }, [selectedModule?.key]);

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
        ...(selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY && {
          video_time_limit: videoTimeLimit,
        }),
      },
      onErrorCallback: (errMessage) => {
        showNotification({
          text: intl.formatMessage({
            id: errMessage || "label.errorOccured",
          }),
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.data_saved_successfully" }),
          type: "success",
        });
        previousSavedData.current = {
          previousSavedItSkills: updatedItSkills,
          previousSavedSoftSkills: updatedSoftSkills,
          previousSavedVideoTimeLimit: videoTimeLimit,
        };
        initializeWithPreviousSavedData();
      },
    });
  };
  const initializeWithPreviousSavedData = () => {
    setVideoTimeLimitError("");
    setItSkills(previousSavedData.current.previousSavedItSkills);
    setSoftSkills(previousSavedData.current.previousSavedSoftSkills);
    setVideoTimeLimit(previousSavedData.current.previousSavedVideoTimeLimit);
  };
  const validate = () => {
    if (
      videoTimeLimit >= MIN_VIDEO_LENGTH &&
      videoTimeLimit <= MAX_VIDEO_LENGTH
    ) {
      setVideoTimeLimitError("");
      return true;
    }
    setVideoTimeLimitError(intl.formatMessage({ id: "label.videolimitError" }));
    return false;
  };

  const renderContent = () => {
    if (isLoading) {
      return <CustomLoader />;
    }
    if (!isLoading && errorGettingConfigurations) {
      return (
        <div className={styles.errorBox}>
          <ErrorMessageBox
            onRetry={getSavedProfileSkills}
            errorText={
              errorGettingConfigurations?.data?.message ||
              errorGettingConfigurations
            }
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      );
    }
    if (
      !isLoading &&
      !errorGettingConfigurations &&
      isGettingConfigurationsSuccessful
    ) {
      return (
        <CaJobsConfigurationsContainer
          {...{
            itSkills,
            selectedModule,
            setItSkills,
            setSoftSkills,
            setVideoTimeLimitError,
            setVideoTimeLimit,
            softSkills,
            videoTimeLimit,
            videoTimeLimitError,
          }}
        />
      );
    }
  };
  return (
    <>
      {notificationContextHolder}
      <ThreeRow
        topSection={
          selectedModule?.key === MODULE_KEYS.CA_JOBS_KEY ? (
            <div className={styles.headerContainer}>
              <ContentHeader headerText="Global Configurations" />
            </div>
          ) : (
            <> </>
          )
        }
        middleSection={renderContent()}
        middleSectionStyle={classes.middleSection}
        bottomSection={
          !errorGettingConfigurations && !isLoading ? (
            <ActionAndCancelButtons
              actionBtnText={intl.formatMessage({
                id: "label.save",
              })}
              cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
              customActionBtnStyles={styles.saveButton}
              customContainerStyle={styles.buttonWrapper}
              isLoading={isSavingConfigurations}
              isActionBtnDisable={
                itSkills.some(
                  (obj) => obj?.error && obj.buttonType !== "add"
                ) ||
                softSkills.some((obj) => obj?.error && obj.buttonType !== "add")
              }
              onActionBtnClick={() => {
                if (validate()) postProfileSkills({ keyName: "fieldValue" });
              }}
              onCancelBtnClick={initializeWithPreviousSavedData}
            />
          ) : (
            <> </>
          )
        }
      />
    </>
  );
};
export default CaJobsConfigurations;
