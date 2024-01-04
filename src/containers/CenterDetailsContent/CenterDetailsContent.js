import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow, TwoColumn, ThreeRow } from "../../core/layouts";

import CentreTable from "../CentreTable";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { SETUP_CENTRE_DETAILS } from "../../dummyData";
import { SESSION } from "../../routes/routeNames";
import { classes } from "./CenterDetailsContent.styles";
import styles from "./CenterDetailsContent.module.scss";

const CenterDetailsContent = ({ intl, responsive }) => {
  const [formData, setFormData] = useState({
    PsychometricFee: "1000",
    centreStartTime: "",
    centreEndTime: "",
  });
  const [tableData, setTableData] = useState(SETUP_CENTRE_DETAILS);
  const { navigateScreen: navigate } = useNavigateScreen();
  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    navigate(SESSION);
  };

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
          />
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customContainerStyles}
            isRequired
            label={intl.formatMessage({ id: "label.centreStartTime" })}
            onChange={(val, timeString) => {
              handleInputChange(val, "centreStartTime");
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.centreStartTime",
            })}
            value={formData?.centreStartTime}
          />
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customContainerStyles}
            isRequired
            label={intl.formatMessage({ id: "label.centreEndTime" })}
            onChange={(val, timeString) => {
              handleInputChange(val, "centreEndTime");
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.centreEndTime",
            })}
            value={formData.centreEndTime}
          />
        </div>
      }
      topSectionStyle={classes.topSectionStyle}
      bottomSection={
        <TwoRow
          className={styles.bottomSectionStyle}
          topSection={
            <ThreeRow
              className={styles.formContainer}
              topSection={
                <Typography className={styles.title}>
                  {intl.formatMessage({ id: "label.configureInterviewDates" })}
                </Typography>
              }
              middleSection={<CentreTable {...{ tableData, setTableData }} />}
              middleSectionStyle={classes.middleSectionStyle}
              bottomSection={<></>}
            />
          }
          bottomSection={
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
                  textStyle={styles.saveButtonTextStyles}
                  btnText={intl.formatMessage({
                    id: "session.saveChanges",
                  })}
                  onClick={handleSave}
                />
              }
            />
          }
          bottomSectionStyle={classes.bottomSectionStyle}
        />
      }
    />
  );
};

CenterDetailsContent.defaultProps = {};

CenterDetailsContent.propTypes = {};

export default CenterDetailsContent;
