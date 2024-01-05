import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import moment from "moment";

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

const CenterDetailsContent = ({ intl, isEdit, responsive }) => {
  const [formData, setFormData] = useState({
    PsychometricFee: "1000",
    centreStartTime: "2023-12-19T05:11:46.000000Z",
    centreEndTime: "2023-12-19T05:11:46.000000Z",
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
            disabled={!isEdit}
          />
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customContainerStyles}
            isRequired
            label={intl.formatMessage({ id: "label.centreStartTime" })}
            onChange={(momentValue, timeString) => {
              handleInputChange(momentValue?.toISOString(), "centreStartTime");
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.centreStartTime",
            })}
            value={moment(formData?.centreStartTime)}
            disabled={!isEdit}
          />
          <CustomDateTimePicker
            customLabelStyles={styles.inputLabel}
            customTimeStyle={styles.timeInput}
            customContainerStyles={styles.customContainerStyles}
            isRequired
            label={intl.formatMessage({ id: "label.centreEndTime" })}
            onChange={(momentValue, timeString) => {
              handleInputChange(momentValue?.toISOString(), "centreEndTime");
            }}
            placeholder={intl.formatMessage({
              id: "label.placeholder.centreEndTime",
            })}
            value={moment(formData.centreEndTime)}
            disabled={!isEdit}
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
              middleSection={
                <CentreTable {...{ isEdit, tableData, setTableData }} />
              }
              middleSectionStyle={classes.middleSectionStyle}
              bottomSection={<></>}
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

CenterDetailsContent.propTypes = { isEdit: PropTypes.bool };

export default CenterDetailsContent;
