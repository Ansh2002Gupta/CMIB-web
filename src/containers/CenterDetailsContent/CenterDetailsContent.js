import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Spin, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";

import CentreTable from "../CentreTable";
import CustomButton from "../../components/CustomButton";
import CustomGrid from "../../components/CustomGrid";
import EditCentreSetupFeeAndTime from "../../components/EditCentreSetupFeeAndTime/EditCentreSetupFeeAndTime";
import useConfigUpdateHandler from "../../services/api-services/SetupCentre/useConfigUpdateHandler";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useResponsive from "../../core/hooks/useResponsive";
import { classes } from "./CenterDetailsContent.styles";
import styles from "./CenterDetailsContent.module.scss";

const CenterDetailsContent = ({
  centreDetailData,
  centreId,
  isEdit,
  roundId,
  selectedModule,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  const { interview_dates } = centreDetailData || {};
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);
  const { showNotification, notificationContextHolder } = useShowNotification();

  const addTableData = {
    isAddRow: true,
    scheduleDate: null,
    participationFee: "",
    firm: { firmFee: "", uptoPartners: "" },
    norm1: "",
    norm2: "",
    norm2MinVacancy: "",
  };

  const [errors, setErrors] = useState([]);

  const { isLoading: isUpdatingConfig, updateCentreConfig } =
    useConfigUpdateHandler();

  useEffect(() => {
    setFormData({
      PsychometricFee: centreDetailData?.psychometric_test_fee,
      centreStartTime: centreDetailData?.centre_start_time,
      centreEndTime: centreDetailData?.centre_end_time,
    });
    const interviewConfiguration = (interview_dates || []).map(
      (interviewRow) => ({
        id: interviewRow.id,
        scheduleDate: interviewRow.interview_schedule_date || null,
        participationFee: interviewRow.participation_fee.toString(),
        firm: {
          firmFee: interviewRow.firm_fee.toString(),
          uptoPartners: interviewRow.numbers_of_partners.toString(),
        },
        norm1: interviewRow.norm1.toString(),
        norm2: interviewRow.norm2.toString(),
        norm2MinVacancy: interviewRow.norm2_min_vacancy.toString(),
      })
    );

    setTableData(() => {
      const newTableData = isEdit
        ? [...interviewConfiguration, addTableData]
        : interviewConfiguration;

      setErrors(
        newTableData.map(() => ({
          scheduleDate: "",
          participationFee: "",
          firm: { firmFee: "", uptoPartners: "" },
          norm1: "",
          norm2: "",
          norm2MinVacancy: "",
        }))
      );

      return newTableData;
    });
  }, [centreDetailData, isEdit]);

  const { navigateScreen: navigate } = useNavigateScreen();

  const handleCancel = () => {
    navigate(-1);
  };

  const validate = (index) => {
    let errorCount = 0;
    if (!tableData[index]?.scheduleDate) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.selectDate" }),
        "scheduleDate",
        index
      );
      errorCount += 1;
    }
    if (
      !(
        !!tableData[index]?.participationFee ||
        tableData[index]?.participationFee === 0
      )
    ) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterParticipationFee" }),
        "participationFee",
        index
      );
      errorCount += 1;
    }
    if (
      !(
        !!tableData[index]?.firm?.firmFee ||
        tableData[index]?.firm?.firmFee === 0
      )
    ) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterFirmFee" }),
        "firm",
        index,
        "firmFee"
      );
      errorCount += 1;
    }
    if (
      !(
        !!tableData[index]?.firm?.uptoPartners ||
        tableData[index]?.firm?.uptoPartners === 0
      )
    ) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterpartner" }),
        "firm",
        index,
        "uptoPartners"
      );
      errorCount += 1;
    }
    if (!(!!tableData[index]?.norm1 || tableData[index]?.norm1 === 0)) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterNorm1" }),
        "norm1",
        index
      );
      errorCount += 1;
    }
    if (!(!!tableData[index]?.norm2 || tableData[index]?.norm2 === 0)) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterNorm2" }),
        "norm2",
        index
      );
      errorCount += 1;
    }
    if (
      !(
        !!tableData[index]?.norm2MinVacancy ||
        tableData[index]?.norm2MinVacancy === 0
      )
    ) {
      handleSetError(
        intl.formatMessage({ id: "centre.error.enterVacancy" }),
        "norm2MinVacancy",
        index
      );
      errorCount += 1;
    }

    return errorCount <= 0;
  };

  const handleSetError = (error, name, index, nestedName) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (nestedName) {
        if (newErrors?.[index]) {
          const updatedNestedData = {
            ...newErrors[index][name],
            [nestedName]: error,
          };
          newErrors[index][name] = updatedNestedData;
        }
      } else {
        if (newErrors?.[index]) {
          newErrors[index][name] = error;
        }
      }
      return newErrors;
    });
  };

  const handleSave = () => {
    const isLastRowEmpty =
      tableData.length > 0 &&
      Object.entries(tableData[tableData.length - 1]).every(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return Object.entries(value).every(
            ([nestedKey, nestedValue]) =>
              nestedValue === addTableData[key][nestedKey]
          );
        }
        return value === addTableData[key];
      });

    const interviewDatesData = isLastRowEmpty
      ? tableData.slice(0, -1)
      : tableData;

    let allRowsValid = true;

    const defaultErrorState = {
      scheduleDate: "",
      participationFee: "",
      firm: { firmFee: "", uptoPartners: "" },
      norm1: "",
      norm2: "",
      norm2MinVacancy: "",
    };

    const newErrors = interviewDatesData.map((_, index) => {
      if (!validate(index)) {
        allRowsValid = false;
        return errors[index];
      }

      return defaultErrorState;
    });

    setErrors([...newErrors, { ...defaultErrorState }]);

    if (!allRowsValid) {
      return;
    }

    const centreDetailsPayload = {
      centre_start_time: formData?.centreStartTime,
      centre_end_time: formData.centreEndTime,
      psychometric_test_fee: parseInt(formData.PsychometricFee),
      interview_dates: interviewDatesData.map((item) => {
        const interviewDateDetails = {
          firm_fee: parseInt(item.firm.firmFee),
          norm1: parseInt(item.norm1),
          norm2: parseInt(item.norm2),
          norm2_min_vacancy: parseInt(item.norm2MinVacancy),
          numbers_of_partners: parseInt(item.firm.uptoPartners),
          participation_fee: parseInt(item.participationFee),
          interview_schedule_date: item.scheduleDate,
        };
        if (item.id) {
          interviewDateDetails.id = parseInt(item.id);
        }
        return interviewDateDetails;
      }),
    };

    updateCentreConfig({
      module: selectedModule,
      payload: centreDetailsPayload,
      centreId: centreId,
      roundId: roundId,
      onErrorCallback: (error) => {
        showNotification({ text: error, type: "error" });
      },
    });
  };

  const handleInputChange = (value, name) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      if (name === "centreStartTime" && prevFormData.centreEndTime) {
        const startTime = value;
        const endTime = prevFormData.centreEndTime;
        const timeDifference = dayjs(startTime, "HH:mm:ss").diff(
          dayjs(endTime, "HH:mm:ss"),
          "minutes"
        );
        if (timeDifference > 0) {
          updatedFormData.centreEndTime = "";
        }
      }
      return updatedFormData;
    });
  };

  const renderContent = () => {
    if (isUpdatingConfig) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }

    const commonTableProps = {
      addTableData,
      errors,
      handleSetError,
      isEdit,
      setTableData,
      setErrors,
      tableData,
      validate,
    };

    const isFirstTableRowFilled = () => {
      if (!tableData.length) return false;

      const firstRow = tableData[0];
      const isValueFilled = (value) => !!value || value === 0;

      return (
        isValueFilled(firstRow?.scheduleDate) &&
        isValueFilled(firstRow?.participationFee) &&
        isValueFilled(firstRow?.firm?.firmFee) &&
        isValueFilled(firstRow?.firm?.uptoPartners) &&
        isValueFilled(firstRow?.norm1) &&
        isValueFilled(firstRow?.norm2) &&
        isValueFilled(firstRow?.norm2MinVacancy)
      );
    };

    const interviewDatesSection = (
      <TwoRow
        className={styles.formContainer}
        topSection={
          <Typography className={styles.title}>
            {intl.formatMessage({
              id: "label.configureInterviewDates",
            })}
          </Typography>
        }
        bottomSection={<CentreTable {...commonTableProps} />}
        bottomSectionStyle={classes.bottomStyle}
      />
    );

    const bottomSectionButtons = isEdit && (
      <TwoColumn
        className={styles.buttonContainer}
        leftSection={
          <CustomButton
            btnText={intl.formatMessage({
              id: "label.cancel",
            })}
            customStyle={
              responsive.isMd ? styles.buttonStyles : styles.mobileButtonStyles
            }
            textStyle={styles.textStyle}
            onClick={handleCancel}
          />
        }
        rightSection={
          <CustomButton
            isBtnDisable={
              !formData?.PsychometricFee ||
              !formData?.centreStartTime ||
              !formData?.centreEndTime ||
              !isFirstTableRowFilled()
            }
            customStyle={styles.customStyle}
            textStyle={styles.saveButtonTextStyles}
            btnText={intl.formatMessage({
              id: "session.saveChanges",
            })}
            onClick={handleSave}
          />
        }
      />
    );

    const centreDetails = [
      { heading: "writtenTestFee", value: formData?.PsychometricFee },
      {
        heading: "centreStartTime",
        value: dayjs(formData?.centreStartTime, "HH:mm:ss").format("hh:mm A"),
      },
      {
        heading: "centreEndTime",
        value: dayjs(formData?.centreEndTime, "HH:mm:ss").format("hh:mm A"),
      },
    ];

    return (
      <>
        {notificationContextHolder}
        <TwoRow
          className={styles.mainContainer}
          topSection={
            isEdit ? (
              <EditCentreSetupFeeAndTime
                isEdit={isEdit}
                handleInputChange={handleInputChange}
                formData={formData}
              />
            ) : (
              <div className={styles.gridStyle}>
                <CustomGrid>
                  {centreDetails.map((item) => (
                    <TwoRow
                      key={item.id}
                      className={styles.gridItem}
                      topSection={
                        <Typography className={styles.grayText}>
                          {intl.formatMessage({
                            id: `label.${item.heading}`,
                          })}
                          <span className={styles.redText}> *</span>
                        </Typography>
                      }
                      bottomSection={
                        <div className={styles.blackText}>{item.value}</div>
                      }
                    />
                  ))}
                </CustomGrid>
              </div>
            )
          }
          topSectionStyle={classes.topSectionStyle}
          bottomSection={
            !isEdit ? (
              <CentreTable {...commonTableProps} />
            ) : (
              <TwoRow
                className={styles.bottomSectionStyle}
                topSection={interviewDatesSection}
                bottomSection={bottomSectionButtons}
                bottomSectionStyle={classes.bottomSectionStyle}
              />
            )
          }
        />
      </>
    );
  };

  return renderContent();
};

CenterDetailsContent.defaultProps = {
  isEdit: true,
};

CenterDetailsContent.propTypes = {
  centreDetailData: PropTypes.object,
  isEdit: PropTypes.bool,
  roundId: PropTypes.string,
  selectedModule: PropTypes.string,
};

export default CenterDetailsContent;
