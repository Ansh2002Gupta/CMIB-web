import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";

import CentreTable from "../CentreTable";
import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput/CustomInput";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";
import { SESSION, SETUP_CENTERS } from "../../routes/routeNames";
import { classes } from "./CenterDetailsContent.styles";
import styles from "./CenterDetailsContent.module.scss";

const CenterDetailsContent = ({ centreDetailData, isEdit }) => {
  const intl = useIntl();
  const responsive = useResponsive();

  const { interview_dates } = centreDetailData || {};
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);

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
    navigate(`${SESSION}/${SETUP_CENTERS}`);
  };

  const handleInputChange = (value, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
            onChange={(momentValue, timeString) => {
              handleInputChange(momentValue, "centreEndTime");
            }}
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
                  {intl.formatMessage({ id: "label.configureInterviewDates" })}
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

CenterDetailsContent.defaultProps = {
  isEdit: true,
};

CenterDetailsContent.propTypes = {
  centreDetailData: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default CenterDetailsContent;
