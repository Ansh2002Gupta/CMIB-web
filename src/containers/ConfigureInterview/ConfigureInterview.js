import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import DataTable from "../../components/DataTable/DataTable";
import { ThemeContext } from "core/providers/theme";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useShowNotification from "../../core/hooks/useShowNotification";
import useUpdateConfigureInterview from "../../services/api-services/ConfigureInterview/useUpdateConfigureInterview";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import getConfigureDateColumns from "./ConfigureInterviewConfig";
import { updateInterviewNotification } from "../../globalContext/notification/notificationActions";
import { isOverlapping } from "../../Utils/validation";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { ROUND_ID, NOTIFICATION_TYPES } from "../../constant/constant";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = ({ centreId, interviewData, roundId }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { handleUpdateConfigureInterview } = useUpdateConfigureInterview();
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
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const [, setNotificationStateDispatch] = useContext(NotificationContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );

  const isEdit = !!(
    currentGlobalSession?.is_editable && currentGlobalSession?.status
  );
  const getInterviewTable = () => {
    if (isEdit) {
      if (interviewData) {
        return [...interviewData, addTableData];
      }
      return [addTableData];
    }
    return interviewData || [];
  };

  const [interviewTable, setInterviewTable] = useState(getInterviewTable());
  const [errors, setErrors] = useState(
    interviewTable.map((item) => ({
      isAddRow: item?.isAddRow,
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

  function checkForErrors() {
    for (let error of errors) {
      if (
        (error.schedule_date ||
          error.start_time ||
          error.end_time ||
          error.no_of_facilities ||
          error.slot_duration) &&
        !error.isAddRow
      ) {
        return true;
      }
    }
    return false;
  }

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
    if (errorCount) return false;

    return true;
  };

  const overlapValidate = () => {
    let errorCount = 0;
    interviewTable.map((item, index) => {
      const sameDates = interviewTable.filter(
        (schedule, ind) =>
          schedule.schedule_date === item.schedule_date && index !== ind
      );
      sameDates.map((data) => {
        if (isOverlapping(item.start_time, data.start_time, data.end_time)) {
          errorCount++;
          handleError(
            "start_time",
            intl.formatMessage({ id: "label.error.overlap" }),
            index
          );
          return;
        }
        if (isOverlapping(item.end_time, data.start_time, data.end_time)) {
          errorCount++;
          handleError(
            "end_time",
            intl.formatMessage({ id: "label.error.overlap" }),
            index
          );
          return;
        }
      });
    });
    if (errorCount) return false;

    return true;
  };

  const redirectToMockInterviewListing = () => {
    navigate(
      `/${currentlySelectedModuleKey}/${SESSION}${SETUP_MOCK_INTERVIEW}?${ROUND_ID}=${roundId}`,
      { replace: true }
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
      if (overlapValidate()) {
        if (validate()) {
          handleUpdateConfigureInterview({
            module: currentlySelectedModuleKey,
            centreId: centreId,
            payload: { data: interviewTable },
            onSuccessCallback: () => {
              setNotificationStateDispatch(updateInterviewNotification(true));
              redirectToMockInterviewListing();
            },
            onErrorCallback: (error) => {
              showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
            },
          });
        }
      }
    } else {
      if (overlapValidate()) {
        handleUpdateConfigureInterview({
          module: currentlySelectedModuleKey,
          centreId: centreId,
          payload: { data: interviewTable.slice(0, -1) },
          onSuccessCallback: () => {
            setNotificationStateDispatch(updateInterviewNotification(true));
            redirectToMockInterviewListing();
          },
          onErrorCallback: (error) => {
            showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
          },
        });
      }
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
            className={[
              isEdit ? styles.topContainer : styles.viewTopContainer,
            ].join(" ")}
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
                (interviewTable.length === 1 &&
                  !interviewTable.at(-1)?.schedule_date &&
                  !interviewTable.at(-1)?.start_time &&
                  !interviewTable.at(-1)?.end_time &&
                  !interviewTable.at(-1)?.no_of_facilities &&
                  !interviewTable.at(-1)?.slot_duration) ||
                checkForErrors()
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
