import React, { useContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Table, Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import getConfigureDateCoumns from "./ConfigureInterviewConfig";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { CONFIGURE_INTERVIEW_DATES } from "../../dummyData";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const isEdit = searchParams.get("mode") === "edit";
  const [tableData, setTableData] = useState(CONFIGURE_INTERVIEW_DATES);
  const [addTableData, setAddTableData] = useState({
    id: Math.random().toString(),
    isAddRow: true,
    scheduleDate: null,
    startTime: null,
    endTime: null,
    facilitiesNumber: null,
    slotDurationInMinutes: "",
  });
  const [errors, setErrors] = useState({
    scheduleDate: "",
    startTime: "",
    endTime: "",
    facilitiesNumber: "",
    slotDurationInMinutes: "",
  });

  const location = useLocation();

  const handleRemove = (record) => {
    const filteredData = tableData.filter((item) => item.id !== record.id);
    setTableData(filteredData);
  };

  const handleAdd = (record) => {
    if (validate()) {
      setTableData((prevTableData) => {
        const newRecord = { ...record };
        delete newRecord.isAddRow;
        return [...prevTableData, newRecord];
      });

      setAddTableData({
        id: Math.random().toString(),
        isAddRow: true,
        scheduleDate: null,
        startTime: null,
        endTime: null,
        facilitiesNumber: null,
        slotDurationInMinutes: "",
      });
    }
  };

  const handleInputChange = (key, value) => {
    setAddTableData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleError = (key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  const validate = () => {
    let errorCount = 0;
    if (!addTableData?.scheduleDate) {
      handleError(
        "scheduleDate",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.startTime) {
      handleError(
        "startTime",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.endTime) {
      handleError(
        "endTime",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.facilitiesNumber) {
      handleError(
        "facilitiesNumber",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addTableData?.slotDurationInMinutes) {
      handleError(
        "slotDurationInMinutes",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (errorCount > 0) return false;

    return true;
  };

  const columns = getConfigureDateCoumns(
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
    navigate(
      `/${selectedModule?.key}/${SESSION}${SETUP_MOCK_INTERVIEW}?${PAGINATION_PROPERTIES.CURRENT_PAGE}=${location.state.current}&${PAGINATION_PROPERTIES.ROW_PER_PAGE}=${location.state.pageSize}`
    );
  };
  const handleCancel = () => {
    navigate(
      `/${selectedModule?.key}/${SESSION}${SETUP_MOCK_INTERVIEW}?${PAGINATION_PROPERTIES.CURRENT_PAGE}=${location.state.current}&${PAGINATION_PROPERTIES.ROW_PER_PAGE}=${location.state.pageSize}`
    );
  };

  const extendedTableData = isEdit ? [...tableData, addTableData] : tableData;

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topContainer}
          topSection={
            <Typography className={styles.titleText}>
              {intl.formatMessage({ id: "label.configureInterviewDates" })}
            </Typography>
          }
          bottomSection={
            <Table
              columns={columns}
              dataSource={extendedTableData}
              pagination={false}
              rowClassName={styles.rowtext}
              scroll={{ x: "max-content" }}
              className={[styles.table, "customTable"]}
              rowKey="id"
            />
          }
        />
      }
      bottomSection={
        <ActionAndCancelButtons
          actionBtnText={intl.formatMessage({
            id: "label.saveChanges",
          })}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          onActionBtnClick={handleOnSubmit}
          isActionBtnDisable={false}
          onCancelBtnClick={handleCancel}
        />
      }
    />
  );
};

export default ConfigureInterview;
