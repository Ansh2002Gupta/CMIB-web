import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Spin, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";

import CentreTable from "../CentreTable";
import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput/CustomInput";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useConfigUpdateHandler from "../../services/api-services/SetupCentre/useConfigUpdateHandler";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import { classes } from "./CenterDetailsContent.styles";
import styles from "./CenterDetailsContent.module.scss";

const CenterDetailsContent = ({
  centreDetailData,
  isEdit,
  roundId,
  selectedModule,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  const { interview_dates, placement_centre_id } = centreDetailData || {};
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);

  const {
    updateCentreConfig,
    isLoading: isUpdatingConfig,
    error: errorWhileUpdatingConfig,
  } = useConfigUpdateHandler();

  useEffect(() => {
    setFormData({
      PsychometricFee: centreDetailData?.psychometric_test_fee,
      centreStartTime: centreDetailData?.centre_start_time,
      centreEndTime: centreDetailData?.centre_end_time,
    });
    const interviewConfiguration = (interview_dates || []).map((date) => ({
      id: Math.random().toString(),
      scheduleDate: date.schedule_date || null,
      participationFee: date.participation_fee.toString(),
      firm: {
        firmFee: date.firm_fee.toString(),
        uptoPartners: date.numbers_of_partners.toString(),
      },
      norm1: date.norm1.toString(),
      norm2: date.norm2.toString(),
      norm2MinVacancy: date.norm2_min_vacancy.toString(),
    }));

    setTableData(interviewConfiguration);
  }, [centreDetailData]);

  const { navigateScreen: navigate } = useNavigateScreen();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    const centreDetails = {
      centre_start_time: dayjs(formData?.centreStartTime, "HH:mm:ss"),
      centre_end_time: dayjs(formData.centreStartTime, "HH:mm:ss"),
      psychometric_test_fee: parseInt(formData.PsychometricFee),
      interview_dates: tableData.map((item) => ({
        firm_fee: parseInt(item.firm.firmFee),
        norm1: parseInt(item.norm1),
        norm2: parseInt(item.norm2),
        norm2_min_vacancy: parseInt(item.norm2MinVacancy),
        numbers_of_partners: parseInt(item.firm.uptoPartners),
        participation_fee: parseInt(item.participationFee),
        interview_schedule_date: dayjs(item.scheduleDate).format("YYYY-MM-DD"),
      })),
    };

    updateCentreConfig({
      module: selectedModule,
      payload: centreDetails,
      centreId: placement_centre_id,
      roundId: roundId,
    });
  };

  const handleInputChange = (value, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderContent = () => {
    if (!isUpdatingConfig && errorWhileUpdatingConfig) {
      return (
        <div className={styles.loaderContainer}>
          <ErrorMessageBox
            onRetry={handleSave}
            errorText={errorWhileUpdatingConfig?.data?.message}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }

    if (isUpdatingConfig) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }

    const handleDisabledEndTime = () => {
      if (!formData.centreStartTime) {
        return {};
      }
      const startTime = dayjs(formData.centreStartTime, "HH:mm:ss");
      return {
        disabledHours: () => {
          const hours = [];
          for (let i = 0; i < startTime.hour(); i++) {
            hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (selectedHour) => {
          const minutes = [];
          if (selectedHour === startTime.hour()) {
            for (let i = 0; i < startTime.minute(); i++) {
              minutes.push(i);
            }
          }
          return minutes;
        },
      };
    };

    return (
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <div className={styles.topSectionStyle}>
            <CustomInput
              customLabelStyles={styles.inputLabel}
              customInputStyles={styles.input}
              customContainerStyles={styles.customContainerStyles}
              isRequired
              label={intl.formatMessage({ id: "label.writtenTestFee" })}
              onChange={(val) => {
                handleInputChange(val.target.value, "PsychometricFee");
              }}
              placeholder={intl.formatMessage({
                id: `label.placeholder.writtenTestFee`,
              })}
              value={formData?.PsychometricFee}
              disabled={!isEdit}
            />
            <CustomDateTimePicker
              customLabelStyles={styles.inputLabel}
              customTimeStyle={styles.timeInput}
              customContainerStyles={styles.customContainerStyles}
              isRequired
              label={intl.formatMessage({ id: "label.centreStartTime" })}
              onChange={(momentValue, timeString) => {
                handleInputChange(momentValue, "centreStartTime");
              }}
              placeholder={intl.formatMessage({
                id: "label.placeholder.centreStartTime",
              })}
              value={dayjs(formData?.centreStartTime, "HH:mm:ss")}
              disabled={!isEdit}
            />
            <CustomDateTimePicker
              customLabelStyles={styles.inputLabel}
              customTimeStyle={styles.timeInput}
              customContainerStyles={styles.customContainerStyles}
              isRequired
              label={intl.formatMessage({ id: "label.centreEndTime" })}
              onChange={(momentValue) => {
                handleInputChange(momentValue, "centreEndTime");
              }}
              disabledTime={handleDisabledEndTime}
              placeholder={intl.formatMessage({
                id: "label.placeholder.centreEndTime",
              })}
              value={dayjs(formData?.centreEndTime, "HH:mm:ss")}
              disabled={!isEdit}
            />
          </div>
        }
        topSectionStyle={classes.topSectionStyle}
        bottomSection={
          <TwoRow
            className={styles.bottomSectionStyle}
            topSection={
              <TwoRow
                className={styles.formContainer}
                topSection={
                  <Typography className={styles.title}>
                    {intl.formatMessage({
                      id: "label.configureInterviewDates",
                    })}
                  </Typography>
                }
                bottomSection={
                  <CentreTable {...{ isEdit, tableData, setTableData }} />
                }
                bottomSectionStyle={classes.bottomStyle}
              />
            }
            bottomSection={
              isEdit && (
                <TwoColumn
                  className={styles.buttonContainer}
                  leftSection={
                    <CustomButton
                      btnText={intl.formatMessage({
                        id: "label.cancel",
                      })}
                      customStyle={
                        responsive.isMd
                          ? styles.buttonStyles
                          : styles.mobileButtonStyles
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
                        !formData?.centreEndTime
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
              )
            }
            bottomSectionStyle={classes.bottomSectionStyle}
          />
        }
      />
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
  roundId: PropTypes.number,
  selectedModule: PropTypes.string,
};

export default CenterDetailsContent;
