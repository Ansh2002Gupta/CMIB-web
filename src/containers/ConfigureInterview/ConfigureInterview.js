import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import DataTable from "../../components/DataTable/DataTable";
import getConfigureDateColumns from "./ConfigureInterviewConfig";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../core/hooks/useShowNotification";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import updateConfigureInterview from "../../services/api-services/ConfigureInterview/updateConfigureInterview";
import { getValidMode } from "../../Utils/validation";
import { urlService } from "../../Utils/urlService";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { ROUND_ID, NOTIFICATION_TYPES } from "../../constant/constant";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = ({ centreId, interviewData }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { handleUpdateConfigureInterview } = updateConfigureInterview();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const addTableData = {
    isAddRow: true,
    schedule_date: null,
    start_time: null,
    end_time: null,
    no_of_facilities: null,
    slot_duration: "",
  };

  const isEdit =
    getValidMode(urlService.getQueryStringValue("mode")) === "edit";
  const roundId = urlService.getQueryStringValue(ROUND_ID);

  const [interviewTable, setInterviewTable] = useState(
    isEdit
      ? interviewData
        ? [...interviewData, addTableData]
        : [addTableData]
      : interviewData || []
  );
  const [errors, setErrors] = useState(
    interviewTable.map(() => ({
      schedule_date: "",
      start_time: "",
      end_time: "",
      no_of_facilities: "",
      slot_duration: "",
    }))
  );

  const handleRemove = (record, index) => {
    const filteredData = interviewTable.filter((item, i) => i !== index);
    const filterErrors = errors.filter((item, i) => i !== index);
    setErrors(filterErrors);
    setInterviewTable(filteredData);
  };

  const handleAdd = (record, index) => {
    if (validate()) {
      setInterviewTable((prevTableData) => {
        const newData = [...prevTableData];
        if (newData?.at(-1) && newData?.at(-1).hasOwnProperty("isAddRow")) {
          delete newData?.at(-1).isAddRow;
        }
        return [
          ...newData,
          {
            isAddRow: true,
            schedule_date: null,
            start_time: null,
            end_time: null,
            no_of_facilities: null,
            slot_duration: "",
          },
        ];
      });
      setErrors((prevData) => {
        return [
          ...prevData,
          {
            schedule_date: "",
            start_time: "",
            end_time: "",
            no_of_facilities: "",
            slot_duration: "",
          },
        ];
      });
    }
  };

  const handleInputChange = (key, value, index) => {
    setInterviewTable((prevTableData) => {
      const newTableData = [...prevTableData];
      newTableData[index] = {
        ...newTableData[index],
        [key]: value,
      };
      return newTableData;
    });
    if (!value) {
      handleError(
        key,
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        index
      );
    } else {
      handleError(key, "", index);
    }
  };

  const handleError = (key, error, index) => {
    setErrors((prevTableError) => {
      const newTableError = [...prevTableError];
      newTableError[index] = {
        ...newTableError[index],
        [key]: error,
      };
      return newTableError;
    });
  };

  const validate = () => {
    let errorCount = 0;
    if (!interviewTable.at(-1)?.schedule_date) {
      handleError(
        "schedule_date",
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        interviewTable.length - 1
      );
      errorCount += 1;
    }
    if (!interviewTable.at(-1).start_time) {
      handleError(
        "start_time",
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        interviewTable.length - 1
      );
      errorCount += 1;
    }
    if (!interviewTable.at(-1)?.end_time) {
      handleError(
        "end_time",
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        interviewTable.length - 1
      );
      errorCount += 1;
    }
    if (!interviewTable.at(-1)?.no_of_facilities) {
      handleError(
        "no_of_facilities",
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        interviewTable.length - 1
      );
      errorCount += 1;
    }
    if (!interviewTable.at(-1)?.slot_duration) {
      handleError(
        "slot_duration",
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        interviewTable.length - 1
      );
      errorCount += 1;
    }
    if (errorCount > 0) return false;

    return true;
  };

  const redirectToMockInterviewListing = () => {
    navigate(
      `/${currentlySelectedModuleKey}/${SESSION}${SETUP_MOCK_INTERVIEW}?${ROUND_ID}=${roundId}`
    );
  };

  const columns = getConfigureDateColumns(
    errors,
    intl,
    isEdit,
    handleAdd,
    handleRemove,
    getImage,
    handleInputChange,
    renderColumn
  );

  const handleOnSubmit = () => {
    if (
      interviewTable.at(-1)?.schedule_date ||
      interviewTable.at(-1)?.start_time ||
      interviewTable.at(-1)?.end_time ||
      interviewTable.at(-1)?.no_of_facilities ||
      interviewTable.at(-1)?.slot_duration
    ) {
      if (validate()) {
        handleUpdateConfigureInterview({
          module: currentlySelectedModuleKey,
          centreId: centreId,
          payload: { data: interviewTable },
          onSuccessCallback: () => {
            redirectToMockInterviewListing();
          },
          onErrorCallback: (error) => {
            showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
          },
        });
      }
    } else {
      console.log(interviewTable.slice(0, -1), "interviewTable.slice(-1)..");
      handleUpdateConfigureInterview({
        module: currentlySelectedModuleKey,
        centreId: centreId,
        payload: { data: interviewTable.slice(0, -1) },
        onSuccessCallback: () => {
          redirectToMockInterviewListing();
        },
        onErrorCallback: (error) => {
          showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
        },
      });
    }
  };
  const handleCancel = () => {
    redirectToMockInterviewListing();
  };

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <TwoRow
            className={[isEdit ? styles.topContainer : styles.viewTopContainer]}
            topSection={
              isEdit && (
                <Typography className={styles.titleText}>
                  {intl.formatMessage({ id: "label.configureInterviewDates" })}
                </Typography>
              )
            }
            bottomSection={
              <DataTable
                {...{
                  columns,
                }}
                hidePagination={true}
                customContainerStyles={[
                  styles.table,
                  isEdit && "customTable",
                  isEdit && styles.editableTableContainer,
                ].join(" ")}
                originalData={interviewTable}
                isHoverEffectRequired={false}
              />
            }
          />
        }
        bottomSection={
          isEdit && (
            <ActionAndCancelButtons
              actionBtnText={intl.formatMessage({
                id: "label.saveChanges",
              })}
              cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
              onActionBtnClick={handleOnSubmit}
              isActionBtnDisable={
                interviewTable.length === 1 &&
                !interviewTable.at(-1)?.schedule_date &&
                !interviewTable.at(-1)?.start_time &&
                !interviewTable.at(-1)?.end_time &&
                !interviewTable.at(-1)?.no_of_facilities &&
                !interviewTable.at(-1)?.slot_duration
              }
              onCancelBtnClick={handleCancel}
            />
          )
        }
      />
    </>
  );
};

export default ConfigureInterview;
