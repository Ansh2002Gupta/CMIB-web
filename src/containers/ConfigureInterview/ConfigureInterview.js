import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { ROUND_ID, NOTIFICATION_TYPES } from "../../constant/constant";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = ({ centreId, interviewData }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams] = useSearchParams();
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

  const isEdit = getValidMode(searchParams.get("mode")) === "edit";
  const roundId = searchParams.get(ROUND_ID);

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

  const handleRemove = (record) => {
    // const filteredData = tableData.filter((item) => item.id !== record.id);
    // setTableData(filteredData);
  };

  const handleAdd = (record) => {
    // if (validate()) {
    //   setTableData((prevTableData) => {
    //     const newRecord = { ...record };
    //     delete newRecord.isAddRow;
    //     return [...prevTableData, newRecord];
    //   });
    //   setAddTableData({
    //     id: Date.now().toString(),
    //     isAddRow: true,
    //     schedule_date: null,
    //     start_time: null,
    //     end_time: null,
    //     no_of_facilities: null,
    //     slot_duration: "",
    //   });
    // }
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
  };

  const handleError = (key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  const validate = () => {
    let errorCount = 0;
    if (!addTableData?.schedule_date) {
      handleError(
        "schedule_date",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.start_time) {
      handleError(
        "start_time",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.end_time) {
      handleError(
        "end_time",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.no_of_facilities) {
      handleError(
        "no_of_facilities",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.slot_duration) {
      handleError(
        "slot_duration",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
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
                isHoverEffectRequired={isEdit}
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
              isActionBtnDisable={false}
              onCancelBtnClick={handleCancel}
            />
          )
        }
      />
    </>
  );
};

export default ConfigureInterview;
