import React, { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CustomLoader from "../../components/CustomLoader";
import DataTable from "../../components/DataTable/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import getConfigureDateColumns from "./ConfigureInterviewConfig";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useFetch from "../../core/hooks/useFetch";
import { getValidMode } from "../../Utils/validation";
import {
  CORE_ROUTE,
  INTERVIEW_DATES,
  MOCK_INTERVIEWS,
} from "../../constant/apiEndpoints";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams] = useSearchParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const { centreId } = useParams();
  const isEdit = getValidMode(searchParams.get("mode")) === "edit";
  const {
    data,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    fetchData,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      MOCK_INTERVIEWS +
      `/${centreId}` +
      INTERVIEW_DATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  useEffect(() => {
    setTableData(data);
  }, [data]);
  const [tableData, setTableData] = useState(data || []);
  const [addTableData, setAddTableData] = useState({
    id: Date.now().toString(),
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
        id: Date.now().toString(),
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

  const redirectToMockInterviewListing = () => {
    navigate(
      `/${selectedModule?.key}/${SESSION}${SETUP_MOCK_INTERVIEW}?${PAGINATION_PROPERTIES.CURRENT_PAGE}=${location.state.current}&${PAGINATION_PROPERTIES.ROW_PER_PAGE}=${location.state.pageSize}`
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
    redirectToMockInterviewListing();
  };
  const handleCancel = () => {
    redirectToMockInterviewListing();
  };

  const extendedTableData = isEdit ? [...tableData, addTableData] : tableData;

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      fetchData({});
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

  return (
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
            isGettingInterview ? (
              <div
                className={[
                  commonStyles.errorContainer,
                  styles.erroredContainer,
                ].join(" ")}
              >
                <CustomLoader />
              </div>
            ) : errorWhileFetchingInterview ? (
              <div
                className={[
                  commonStyles.errorContainer,
                  styles.erroredContainer,
                ].join(" ")}
              >
                <ErrorMessageBox
                  onRetry={() => fetchData({})}
                  errorText={errorWhileFetchingInterview?.data?.message}
                  errorHeading={intl.formatMessage({ id: "label.error" })}
                />
              </div>
            ) : (
              <DataTable
                {...{
                  columns,
                }}
                hidePagination={true}
                customContainerStyles={[styles.table].join(" ")}
                originalData={extendedTableData}
                isHoverEffectRequired={isEdit}
              />
            )
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
  );
};

export default ConfigureInterview;
