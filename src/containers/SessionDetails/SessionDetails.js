import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { DatePicker, Image, Select, Switch, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import { convertdateToStringDate } from "../../constant/utils";
import { FIELDS } from "./sessionFieldDetails";
import { SESSION_DETAILS } from "../../dummyData";
import { classes } from "./SessionDetails.styles";
import styles from "./SessionDetails.module.scss";
import "./Override.css";

const SessionDetails = ({ addSession, setAddSession }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);

  const [formErrors, setFormErrors] = useState({});
  const [edit, setEdit] = useState(addSession);
  const [formData, setFormData] = useState(SESSION_DETAILS);
  const { MonthPicker } = DatePicker;

  const handleMonthChange = (date, dateString) => {
    if (date) {
      let updatedMonths = [...formData.examination_session_period];
      const formattedDate = dayjs(date).format("MMM YYYY");
      const index = updatedMonths.findIndex((month) => month === formattedDate);

      if (index === -1) {
        updatedMonths.push(formattedDate);
      } else {
        updatedMonths.splice(index, 1);
      }
      setFormData({
        ...formData,
        examination_session_period: updatedMonths,
      });
    }
  };

  const handleDeselect = (value) => {
    const updatedMonths = formData.examination_session_period.filter(
      (month) => month !== value
    );
    setFormData({
      ...formData,
      examination_session_period: updatedMonths,
    });
  };

  const fields = FIELDS(
    formData?.name,
    formData?.nature_of_service,
    formData?.perform_invoice_no_format,
    formData?.examination_session_period,
    formData?.gmcs_completion_date,
    formData?.membership_completion_date,
    formData?.session_start_date,
    formData?.article_completion_from_date,
    formData?.bank_account_offline,
    formData?.bank_account_online
  );

  useEffect(() => {
    setEdit(addSession);
    if (addSession) {
      setFormData({});
    }
  }, [addSession]);

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    const fieldRules = fields.find((field) => field.label === name)?.rules;
    const error = validateField(value, fieldRules);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateField = (value, rules) => {
    if (!rules) return undefined;

    for (const rule of rules) {
      if (rule.required && (!value || value.length <= 0)) {
        return rule.message;
      }
    }

    return undefined;
  };

  const handleCancel = () => {
    setFormData(SESSION_DETAILS);
    setEdit(false);
    setAddSession(false);
    setFormErrors({});
  };
  const handleSave = () => {
    setEdit(false);
  };

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.sessionDetails}
          topSection={
            <TwoColumn
              className={styles.headerContainer}
              leftSection={
                <Typography className={styles.headingText}>
                  {intl.formatMessage({ id: "session.sessionDetails" })}
                </Typography>
              }
              rightSection={
                !edit && (
                  <TwoColumn
                    onClick={() => {
                      setEdit(true);
                    }}
                    className={styles.editContainer}
                    leftSection={
                      <Image
                        src={getImage("editIcon")}
                        className={styles.editIcon}
                        preview={false}
                      />
                    }
                    rightSection={
                      <Typography className={styles.blackText}>
                        {intl.formatMessage({ id: "session.edit" })}
                      </Typography>
                    }
                  />
                )
              }
            />
          }
          bottomSection={
            <CustomGrid>
              {fields.map((item) => (
                <TwoRow
                  key={item.id}
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `session.${item.headingIntl}`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    edit ? (
                      <div className={styles.formInputStyles}>
                        {item.id === 5 ||
                        item.id === 6 ||
                        item.id === 7 ||
                        item.id === 8 ? (
                          <DatePicker
                            format="MM/DD/YYYY"
                            className={styles.dateInput}
                            onChange={(val, dateString) => {
                              handleInputChange(dateString, item.label);
                            }}
                            placeholder={intl.formatMessage({
                              id: `session.placeholder.${item.headingIntl}`,
                            })}
                            value={dayjs(item.value)}
                          />
                        ) : item.id === 4 ? (
                          <div>
                            <MonthPicker
                              format="YYYY/MM"
                              className={styles.multilpleInput}
                              size={"large"}
                              placeholder={intl.formatMessage({
                                id: `session.placeholder.${item.headingIntl}`,
                              })}
                              onChange={handleMonthChange}
                              style={classes.multiSelectStyle}
                              disabledDate={(current) =>
                                formData.examination_session_period.includes(
                                  dayjs(current).format("MMM YYYY")
                                )
                              }
                            />

                            <div className={styles.examinationFieldContainer}>
                              {formData.examination_session_period.map(
                                (item, index) => {
                                  return (
                                    <div
                                      className={styles.chipContainer}
                                      key={index}
                                    >
                                      <Typography className={styles.chipText}>
                                        {convertdateToStringDate(item)}
                                      </Typography>
                                      <Image
                                        src={getImage("cross")}
                                        className={styles.crossIcon}
                                        preview={false}
                                        onClick={() => {
                                          handleDeselect(item);
                                        }}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : (
                          <CustomInput
                            value={item.value}
                            disabled={!edit}
                            customLabelStyles={styles.inputLabel}
                            customInputStyles={styles.input}
                            customContainerStyles={styles.customContainerStyles}
                            onChange={(val) =>
                              handleInputChange(val.target.value, item.label)
                            }
                            placeholder={intl.formatMessage({
                              id: `session.placeholder.${item.headingIntl}`,
                            })}
                          />
                        )}
                        {formErrors[item.label] && (
                          <Typography className={styles.errorText}>
                            {formErrors[item.label]}
                          </Typography>
                        )}
                      </div>
                    ) : item?.id !== 4 ? (
                      <Typography className={styles.blackText}>
                        {item.value}
                      </Typography>
                    ) : (
                      <div className={styles.examinationFieldContainer}>
                        {item.value?.map((val, index) => (
                          <Typography key={index} className={styles.periodText}>
                            {val}
                          </Typography>
                        ))}
                      </div>
                    )
                  }
                />
              ))}
              <TwoRow
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({ id: "label.status" })}
                  </Typography>
                }
                bottomSection={
                  <TwoColumn
                    className={styles.statusContainer}
                    leftSection={
                      <Switch
                        style={formData?.status && classes.switchBackground}
                        checked={formData?.status}
                        onChange={() => {
                          setFormData({
                            ...formData,
                            status: !formData.status,
                          });
                        }}
                        disabled={!edit}
                      />
                    }
                    rightSection={
                      <Typography className={styles.blackText}>
                        {intl.formatMessage({
                          id: `label.${
                            formData?.status ? "active" : "inactive"
                          }`,
                        })}
                      </Typography>
                    }
                  />
                }
              />
            </CustomGrid>
          }
        />
      }
      bottomSection={
        !!edit && (
          <TwoColumn
            className={styles.editContainer}
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
                  Object.values(formErrors).some((error) => !!error) ||
                  !formData?.name ||
                  !formData?.session_start_date ||
                  !formData?.nature_of_service ||
                  !formData?.perform_invoice_no_format ||
                  !formData?.examination_session_period ||
                  !formData?.gmcs_completion_date ||
                  !formData?.membership_completion_date ||
                  !formData?.article_completion_from_date ||
                  !formData?.bank_account_offline ||
                  !formData?.bank_account_online
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
  );
};

SessionDetails.defaultProps = {
  addSession: false,
  setAddSession: () => {},
};

SessionDetails.propTypes = {
  addSession: PropTypes.bool,
  setAddSession: PropTypes.func,
};

export default SessionDetails;
