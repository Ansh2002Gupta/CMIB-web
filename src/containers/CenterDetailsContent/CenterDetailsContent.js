import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Spin, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";

import CentreTable from "../CentreTable";
import CustomButton from "../../components/CustomButton";
import CustomGrid from "../../components/CustomGrid";
import EditCentreSetupFeeAndTime from "../../components/EditCentreSetupFeeAndTime/EditCentreSetupFeeAndTime";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import useConfigUpdateHandler from "../../services/api-services/SetupCentre/useConfigUpdateHandler";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import useShowNotification from "../../core/hooks/useShowNotification";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import { checkForValidNumber } from "../../constant/utils";
import {
  ROUND_ONE_SETUP_CENTERS,
  ROUND_TWO_SETUP_CENTERS,
  SESSION,
} from "../../routes/routeNames";
import { MODULE_KEYS, PAYMENT_TYPE } from "../../constant/constant";
import { classes } from "./CenterDetailsContent.styles";
import styles from "./CenterDetailsContent.module.scss";

const CenterDetailsContent = ({
  centreDetailData,
  centreId,
  isEdit,
  location,
  roundId,
  sessionId,
  selectedModule,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [, setNotificationStateDispatch] = useContext(NotificationContext);

  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);

  const isNqcaModule =
    selectedModule === MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY;
  const isOverseasModule = selectedModule === MODULE_KEYS.OVERSEAS_CHAPTERS_KEY;
  const { interview_dates } = centreDetailData || {};
  const paymentType = location?.state?.paymentType || PAYMENT_TYPE.CENTRE_WISE;
  const isCentreWisePayment = paymentType === PAYMENT_TYPE.CENTRE_WISE;

  const hasRoundTwo = location?.pathname.includes("round2");

  const addTableData = {
    isAddRow: true,
    scheduleDate: null,
    participationFee: "",
    firm: { firmFee: "", uptoPartners: "" },
    ...(isOverseasModule && {
      interviewType: "",
    }),
    ...(isNqcaModule && { norm1: "" }),
    ...(isNqcaModule && { norm2: "" }),
    ...(isNqcaModule && { norm2MinVacancy: "" }),
  };

  const [errors, setErrors] = useState([]);

  const { isLoading: isUpdatingConfig, updateCentreConfig } =
    useConfigUpdateHandler();

  useEffect(() => {
    setFormData({
      ...(isNqcaModule && {
        PsychometricFee: centreDetailData?.psychometric_test_fee,
      }),
      centreStartTime: centreDetailData?.centre_start_time,
      centreEndTime: centreDetailData?.centre_end_time,
    });
    const interviewConfiguration = (interview_dates || []).map(
      (interviewRow) => ({
        id: interviewRow.id,
        scheduleDate: interviewRow?.interview_schedule_date || null,
        ...(isCentreWisePayment && {
          participationFee: interviewRow?.participation_fee?.toString(),
        }),
        ...(isCentreWisePayment && {
          firm: {
            firmFee: interviewRow?.firm_fee?.toString(),
            uptoPartners: interviewRow.numbers_of_partners?.toString(),
          },
        }),
        ...(isNqcaModule && { norm1: interviewRow?.norm1?.toString() }),
        ...(isNqcaModule && { norm2: interviewRow?.norm2?.toString() }),
        ...(isNqcaModule && {
          norm2MinVacancy: interviewRow?.norm2_min_vacancy?.toString(),
        }),
        ...(isOverseasModule && {
          interviewType: interviewRow?.interview_type,
        }),
      })
    );

    function getNewTableData(
      isEdit,
      hasRoundTwo,
      interviewConfiguration,
      addTableData,
      interview_dates
    ) {
      if (isEdit) {
        if (hasRoundTwo && !!interview_dates?.length) {
          return [...interviewConfiguration];
        } else {
          return [...interviewConfiguration, addTableData];
        }
      } else {
        return interviewConfiguration;
      }
    }

    setTableData(() => {
      const newTableData = getNewTableData(
        isEdit,
        hasRoundTwo,
        interviewConfiguration,
        addTableData,
        interview_dates
      );

      setErrors(
        newTableData.map(() => ({
          scheduleDate: "",
          ...(isCentreWisePayment && {
            participationFee: "",
          }),
          ...(isCentreWisePayment && {
            firm: { firmFee: "", uptoPartners: "" },
          }),
          ...(isNqcaModule && { norm1: "" }),
          ...(isNqcaModule && { norm2: "" }),
          ...(isNqcaModule && { norm2MinVacancy: "" }),
          ...(isOverseasModule && {
            interviewType: "",
          }),
        }))
      );

      return newTableData;
    });
  }, [centreDetailData, isEdit]);

  const { navigateScreen: navigate } = useNavigateScreen();

  const navigateToSetupCentreScreen = () => {
    navigate(
      `/${selectedModule}/${SESSION}${
        hasRoundTwo ? ROUND_TWO_SETUP_CENTERS : ROUND_ONE_SETUP_CENTERS
      }?roundId=${roundId}`
    );
  };

  const validateScheduleDate = (index) => {
    let errorCount = 0;
    if (!tableData[index]?.scheduleDate) {
      handleSetError("scheduleDate", index);
      errorCount += 1;
    }
    return errorCount <= 0;
  };

  const validate = (index) => {
    let errorCount = 0;
    if (!tableData[index]?.scheduleDate) {
      handleSetError("scheduleDate", index);
      errorCount += 1;
    }
    if (
      isCentreWisePayment &&
      !checkForValidNumber(tableData[index]?.participationFee)
    ) {
      handleSetError("participationFee", index);
      errorCount += 1;
    }
    if (
      isCentreWisePayment &&
      !checkForValidNumber(tableData[index]?.firm?.firmFee)
    ) {
      handleSetError("firm", index, "firmFee");
      errorCount += 1;
    }
    if (
      isCentreWisePayment &&
      !checkForValidNumber(tableData[index]?.firm?.uptoPartners)
    ) {
      handleSetError("firm", index, "uptoPartners");
      errorCount += 1;
    }
    if (isNqcaModule && !checkForValidNumber(tableData[index]?.norm1)) {
      handleSetError("norm1", index);
      errorCount += 1;
    }
    if (isNqcaModule && !checkForValidNumber(tableData[index]?.norm2)) {
      handleSetError("norm2", index);
      errorCount += 1;
    }
    if (
      isNqcaModule &&
      !checkForValidNumber(tableData[index]?.norm2MinVacancy)
    ) {
      handleSetError("norm2MinVacancy", index);
      errorCount += 1;
    }
    if (isOverseasModule && tableData[index]?.interviewType === "") {
      handleSetError("interviewType", index);
      errorCount += 1;
    }

    return errorCount <= 0;
  };

  const handleSetError = (name, index, nestedName) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (newErrors?.[index]) {
        if (nestedName) {
          const updatedNestedData = {
            ...newErrors[index][name],
            [nestedName]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
          };
          newErrors[index][name] = updatedNestedData;
        } else {
          newErrors[index][name] = intl.formatMessage({
            id: "label.error.fieldEmpty",
          });
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
              nestedValue === addTableData[key][nestedKey] ||
              nestedValue === null ||
              value === ""
          );
        }
        return value === addTableData[key] || value === null || value === "";
      });

    const interviewDatesData = isLastRowEmpty
      ? tableData.slice(0, -1)
      : tableData;

    let allRowsValid = true;

    const defaultErrorState = {
      scheduleDate: "",
      ...(isCentreWisePayment && {
        participationFee: "",
      }),
      ...(isCentreWisePayment && {
        firm: { firmFee: "", uptoPartners: "" },
      }),
      ...(isNqcaModule && { norm1: "" }),
      ...(isNqcaModule && { norm2: "" }),
      ...(isNqcaModule && { norm2MinVacancy: "" }),
      ...(isOverseasModule && {
        interviewType: "",
      }),
    };

    const newErrors = interviewDatesData.map((_, index) => {
      if (hasRoundTwo) {
        if (!validateScheduleDate(index)) {
          allRowsValid = false;
          return errors[index];
        }
      } else {
        if (!validate(index)) {
          allRowsValid = false;
          return errors[index];
        }
      }
      return defaultErrorState;
    });

    setErrors([...newErrors, { ...defaultErrorState }]);

    if (!allRowsValid) {
      return;
    }

    const roundTwoCentreDetailsPayload = {
      centre_start_time: formData?.centreStartTime,
      centre_end_time: formData.centreEndTime,
      interview_dates: interviewDatesData.map((item) => {
        const interviewDateDetails = {
          interview_schedule_date: item.scheduleDate,
        };
        return interviewDateDetails;
      }),
    };

    const centreDetailsPayload = {
      centre_start_time: formData?.centreStartTime,
      centre_end_time: formData.centreEndTime,
      ...(isNqcaModule && {
        psychometric_test_fee: parseInt(formData.PsychometricFee),
      }),
      interview_dates: interviewDatesData.map((item) => {
        const interviewDateDetails = {
          ...(isCentreWisePayment && {
            firm_fee: parseInt(item.firm.firmFee),
          }),
          ...(isNqcaModule && { norm1: parseInt(item.norm1) }),
          ...(isNqcaModule && { norm2: parseInt(item.norm2) }),
          ...(isNqcaModule && {
            norm2_min_vacancy: parseInt(item.norm2MinVacancy),
          }),
          ...(isOverseasModule && {
            interview_type: item.interviewType,
          }),
          ...(isCentreWisePayment && {
            numbers_of_partners: parseInt(item.firm.uptoPartners),
          }),
          ...(isCentreWisePayment && {
            participation_fee: parseInt(item.participationFee),
          }),
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
      payload: hasRoundTwo
        ? roundTwoCentreDetailsPayload
        : centreDetailsPayload,
      centreId: centreId,
      roundId: roundId,
      sessionId,
      onSuccessCallback: () => {
        setNotificationStateDispatch(setShowSuccessNotification(true));
        navigateToSetupCentreScreen();
      },
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
        if (timeDifference >= 0) {
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
      hasRoundTwo,
      isNqcaModule,
      isEdit,
      paymentType,
      selectedModule,
      setTableData,
      setErrors,
      tableData,
      validate,
    };

    const isFirstTableRowFilled = () => {
      if (!tableData.length) return false;

      if (hasRoundTwo) {
        const firstRow = tableData[0];
        return checkForValidNumber(firstRow?.scheduleDate);
      }
      const firstRow = tableData[0];

      return (
        checkForValidNumber(firstRow?.scheduleDate) &&
        (isCentreWisePayment
          ? checkForValidNumber(firstRow?.participationFee)
          : true) &&
        (isCentreWisePayment
          ? checkForValidNumber(firstRow?.firm?.firmFee)
          : true) &&
        (isCentreWisePayment
          ? checkForValidNumber(firstRow?.firm?.uptoPartners)
          : true) &&
        (isNqcaModule ? checkForValidNumber(firstRow?.norm1) : true) &&
        (isNqcaModule ? checkForValidNumber(firstRow?.norm2) : true) &&
        (isNqcaModule
          ? checkForValidNumber(firstRow?.norm2MinVacancy)
          : true) &&
        (isOverseasModule ? checkForValidNumber(firstRow.interviewType) : true)
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
            onClick={navigateToSetupCentreScreen}
          />
        }
        rightSection={
          <CustomButton
            isBtnDisable={
              (!hasRoundTwo && isNqcaModule && !formData?.PsychometricFee) ||
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

    const centreDetails = isNqcaModule
      ? [
          {
            heading: "writtenTestFee",
            value: formData?.PsychometricFee,
          },
          {
            heading: "centreStartTime",
            value: formData?.centreStartTime
              ? dayjs(formData?.centreStartTime, "HH:mm:ss").format("hh:mm A")
              : "-",
          },
          {
            heading: "centreEndTime",
            value: formData?.centreEndTime
              ? dayjs(formData?.centreEndTime, "HH:mm:ss").format("hh:mm A")
              : "-",
          },
        ]
      : [
          {
            heading: "centreStartTime",
            value: formData?.centreStartTime
              ? dayjs(formData?.centreStartTime, "HH:mm:ss").format("hh:mm A")
              : "-",
          },
          {
            heading: "centreEndTime",
            value: formData?.centreEndTime
              ? dayjs(formData?.centreEndTime, "HH:mm:ss").format("hh:mm A")
              : "-",
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
                hasRoundTwo={hasRoundTwo}
                formData={formData}
                selectedModule={selectedModule}
              />
            ) : (
              <div className={styles.gridStyle}>
                <CustomGrid>
                  {centreDetails.map((item) =>
                    item?.heading?.toLowerCase() === "writtentestfee" &&
                    hasRoundTwo ? null : (
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
                          <div className={styles.blackText}>
                            {item.value || "-"}
                          </div>
                        }
                      />
                    )
                  )}
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
