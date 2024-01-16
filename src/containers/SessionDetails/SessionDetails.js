import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { DatePicker, Image, Select, Switch, Typography } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import useSession from "../../services/api-services/Session/useSession";
import useFetch from "../../core/hooks/useFetch";
import CustomButton from "../../components/CustomButton";
import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import { PLACEMENT_CORE_SESSION } from "../../constant/apiEndpoints";
import { FIELDS } from "./sessionFieldDetails";
import { SESSION_DETAILS } from "../../dummyData";
import { classes } from "./SessionDetails.styles";
import styles from "./SessionDetails.module.scss";
import "./Override.css";

const SessionDetails = ({ addSession, setAddSession }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);
  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: PLACEMENT_CORE_SESSION,
  });
  const {
    handleAddSession,
    isError: addSessionError,
    errorWhileAddSession,
    isSuccess: addSessionSuccess,
  } = useSession();

  const [formErrors, setFormErrors] = useState({});
  const [edit, setEdit] = useState(addSession);
  const [formData, setFormData] = useState(SESSION_DETAILS);

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

  console.log(
    addSessionSuccess,
    "addSessionSuccess...",
    addSessionError,
    "addSessionError...",
    errorWhileAddSession,
    "errorWhileAddSession..."
  );

  useEffect(() => {
    setEdit(addSession);
    if (addSession) {
      setFormData({});
    }
  }, [addSession]);

  useEffect(() => {
    if (data) {
      setFormData(data[0]);
    }
  }, [data]);

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
    setFormData(data[0]);
    setEdit(false);
    setAddSession(false);
    setFormErrors({});
  };
  const handleSave = () => {
    const updatedpayload = {
      name: formData?.name,
      module_id: Math.random(),
      nature_of_service: formData?.nature_of_service,
      perform_invoice_no_format: formData?.perform_invoice_no_format,
      bank_ac_offline: formData?.bank_account_offline,
      bank_ac_online: formData?.bank_account_online,
      hsn_sac_code: "UAD22",
      examination_session_periods: formData?.examination_session_period,
      membership_as_on_date: "2023-02-19 17:13:18",
    };
    if (addSession) {
      handleAddSession({ payload: updatedpayload });
    }
    setEdit(false);
  };

  console.log(data, "data");

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
                          />
                        ) : item.id === 4 ? (
                          //TODO:Replace this component with common component of custom input which contains multiselect
                          <Select
                            bordered={false}
                            size={"large"}
                            style={classes.multiSelectStyle}
                            className={styles.multilpleInput}
                            onChange={(val) => {
                              handleInputChange(val, item.label);
                            }}
                            options={item.selectOptions}
                            placeholder={intl.formatMessage({
                              id: `session.placeholder.${item.headingIntl}`,
                            })}
                            value={item.value}
                            mode="multiple"
                          />
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
