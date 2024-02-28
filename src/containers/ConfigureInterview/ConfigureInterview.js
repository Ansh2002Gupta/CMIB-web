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
import updateConfigureInterview from "../../services/api-services/ConfigureInterview/updateConfigureInterview";
import useFetch from "../../core/hooks/useFetch";
import { getValidMode } from "../../Utils/validation";
import {
  CORE_ROUTE,
  INTERVIEW_DATES,
  MOCK_INTERVIEWS,
} from "../../constant/apiEndpoints";
import { SETUP_MOCK_INTERVIEW, SESSION } from "../../routes/routeNames";
import { ROUND_ID } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./ConfigureInterview.module.scss";

const ConfigureInterview = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams] = useSearchParams();
  const { handleUpdateConfigureInterview } = updateConfigureInterview();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const { centreId } = useParams();

  const isEdit = getValidMode(searchParams.get("mode")) === "edit";
  const roundId = searchParams.get(ROUND_ID);
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
    schedule_date: null,
    start_time: null,
    end_time: null,
    no_of_facilities: null,
    slot_duration: "",
  });
  const [errors, setErrors] = useState({
    schedule_date: "",
    start_time: "",
    end_time: "",
    no_of_facilities: "",
    slot_duration: "",
  });

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
        schedule_date: null,
        start_time: null,
        end_time: null,
        no_of_facilities: null,
        slot_duration: "",
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
      `/${selectedModule?.key}/${SESSION}${SETUP_MOCK_INTERVIEW}?${ROUND_ID}=${roundId}`
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
    console.log(extendedTableData, "extendedTableData..");
    handleUpdateConfigureInterview({
      module: currentlySelectedModuleKey,
      centreId: centreId,
      payload: { data: extendedTableData },
    });
    redirectToMockInterviewListing();
  };
  const handleCancel = () => {
    redirectToMockInterviewListing();
  };

  const extendedTableData = isEdit
    ? tableData
      ? [...tableData, addTableData]
      : [addTableData]
    : tableData;
  console.log(tableData, "tableData..");
  console.log(extendedTableData, "extendedTableData..");

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
                customContainerStyles={[
                  styles.table,
                  isEdit && "customTable",
                  isEdit && styles.editableTableContainer,
                ].join(" ")}
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
