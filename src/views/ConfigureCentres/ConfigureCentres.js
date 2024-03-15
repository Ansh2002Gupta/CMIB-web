import React, { useCallback, useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import ConfigureCentreContent from "../../containers/ConfigureCentre/ConfigureCentreContent/ConfigureCentreContent";
import ConfigureCentreHeader from "../../containers/ConfigureCentre/ConfigureCentreHeader";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import CustomTabs from "../../components/CustomTabs";
import ProfileSkills from "../../containers/ProfileSkills/ProfileSkills";
import useFetch from "../../../core/hooks/useFetch";
import useShowNotification from "../../core/hooks/useShowNotification";
import usePostGlobalConfigurationsApi from "../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import { urlService } from "../../Utils/urlService";
import { returnFieldObjects } from "./helpers";
import { CAJOBS_ROUTE, MASTER } from "../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../routes/routeNames";
import {
  ACTIVE_TAB,
  VALID_GLOBAL_CONFIGURATIONS_TABS_ID,
  NOTIFICATION_TYPES,
} from "../../constant/constant";
import { getCurrentActiveTab } from "../../constant/utils";
import { initialFieldState } from "./constant";
import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_GLOBAL_CONFIGURATIONS_TABS_ID
    )
  );
  const [itSkills, setItSkills] = useState(initialFieldState);
  const [softSkills, setSoftSkills] = useState(initialFieldState);
  const previousSavedData = useRef();
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
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

  const tabItems = [
    {
      key: "1",
      title: "Configure Centres",
      children: <ConfigureCentreContent />,
    },
    {
      key: "2",
      title: "Set Profile Skills",
      children: (
        <div className={styles.configureCentreContentWrapper}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <>
              <ProfileSkills
                {...{
                  itSkills,
                  setItSkills,
                  setSoftSkills,
                  softSkills,
                }}
              />
              <ActionAndCancelButtons
                actionBtnText={intl.formatMessage({
                  id: "label.save",
                })}
                cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                customActionBtnStyles={styles.saveButton}
                customCancelBtnStyles={styles.cancelButton}
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
            </>
          )}
        </div>
      ),
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleOnTabSwitch = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        isBottomFillSpace
        className={styles.baseLayout}
        topSection={
          <ConfigureCentreHeader
            customHeaderStyling={styles.customHeaderStyling}
            tabComponent={
              <CustomTabs
                activeTab={activeTab}
                customTabContainerStyling={styles.tabContainer}
                setActiveTab={handleOnTabSwitch}
                tabs={tabItems}
                tabsKeyText={ACTIVE_TAB}
              />
            }
            showButton={activeTab === "1"}
          />
        }
        bottomSection={activeTabChildren.children}
      />
    </>
  );
};

export default ConfigureCentres;
