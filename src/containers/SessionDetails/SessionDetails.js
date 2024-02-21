import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { DatePicker, Image, Typography } from "antd";

import { TwoRow, TwoColumn, Base } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import CustomLoader from "../../components/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import {
  addSessionNotification,
  updateSessionNotification,
} from "../../globalContext/notification/notificationActions";
import useAddNewSessionApi from "../../services/api-services/Sessions/useAddNewSessionApi";
import { removeItem } from "../../services/encrypted-storage-service";
import useUpdateSessionApi from "../../services/api-services/Sessions/useUpdateSessionApi";
import useGlobalSessionListApi from "../../services/api-services/GlobalSessionList/useGlobalSessionListApi";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  formatDate,
  convertDateToStringDate,
  isObjectHasNoValues,
} from "../../constant/utils";
import { MODULE_KEYS, NOTIFICATION_TYPES } from "../../constant/constant";
import { FIELDS } from "./sessionFieldDetails";
import { EDIT_SESSION, SESSION } from "../../routes/routeNames";
import { FIELDS } from "./sessionFieldDetails";
import { NOTIFICATION_TYPES, SESSION_KEY } from "../../constant/constant";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { classes } from "./SessionDetails.styles";
import styles from "./SessionDetails.module.scss";
import "./Override.css";

const SessionDetails = ({
  addSession,
  isEditable,
  isGettingSessions,
  isSessionError,
  fetchData,
  sessionData,
  sessionError,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { getGlobalSessionList } = useGlobalSessionListApi();
  const [, setNotificationStateDispatch] = useContext(NotificationContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [formErrors, setFormErrors] = useState({});

  const initialFormState = {
    name: "",
    module: "",
    nature_of_services: "",
    pi_number_format: "",
    bank_ac_no: "",
    bank_ac_ifsc: "",
    hsn_sac_code: "",
    ps_examination_periods: [],
    mcs_completion_date: "",
    membership_completion_date: "",
    article_completion_from_date: "",
    article_completion_to_date: "",
    membership_as_on_date: "",
  };

  const [formData, setFormData] = useState(
    addSession ? initialFormState : sessionData
  );
  const { addNewSession } = useAddNewSessionApi();
  const { updateSessionDetails } = useUpdateSessionApi();
  const { MonthPicker } = DatePicker;

  useEffect(() => {
    if (currentlySelectedModuleKey && sessionData?.status === 0) {
      navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
    }
  }, []);

  const handleMonthChange = (date) => {
    if (date) {
      let updatedMonths = [...formData.ps_examination_periods];
      const formattedDate = dayjs(date).format("MM-YYYY");
      const index = updatedMonths.findIndex((month) => month === formattedDate);

      if (index === -1) {
        updatedMonths.push(formattedDate);
      } else {
        updatedMonths.splice(index, 1);
      }
      setFormData({
        ...formData,
        ps_examination_periods: updatedMonths,
      });

      const fieldRules = fields.find(
        (field) => field.label === "ps_examination_periods"
      )?.rules;
      const error = validateField(updatedMonths, fieldRules);
      setFormErrors({
        ...formErrors,
        ["ps_examination_periods"]: error,
      });
    }
  };

  const handleDeselect = (value) => {
    const updatedMonths = formData.ps_examination_periods.filter(
      (month) => month !== value
    );
    setFormData({
      ...formData,
      ps_examination_periods: updatedMonths,
    });
    const fieldRules = fields.find(
      (field) => field.label === "ps_examination_periods"
    )?.rules;
    const error = validateField(updatedMonths, fieldRules);
    setFormErrors({
      ...formErrors,
      ["ps_examination_periods"]: error,
    });
  };

  const fields = FIELDS(
    formData?.name,
    formData?.nature_of_services,
    formData?.pi_number_format,
    formData?.ps_examination_periods,
    formData?.mcs_completion_date,
    formData?.membership_completion_date,
    formData?.article_completion_to_date,
    formData?.article_completion_from_date,
    formData?.membership_as_on_date,
    formData?.hsn_sac_code,
    formData?.bank_ac_no,
    formData?.bank_ac_ifsc,
    currentlySelectedModuleKey
  );

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: name === "bank_ac_ifsc" ? value.toUpperCase() : value,
    });

    const fieldRules = fields.find((field) => field.label === name)?.rules;
    let error = validateField(value, fieldRules);

    setFormErrors({
      ...formErrors,
      [name]: error,
    });

    if (
      name === "article_completion_from_date" &&
      value &&
      fields?.[7]?.value
    ) {
      let isAfter =
        dayjs(value).isAfter(dayjs(fields?.[7]?.value)) ||
        dayjs(value).isSame(dayjs(fields?.[7]?.value));
      if (isAfter) {
        error = intl.formatMessage({
          id: `session.error.articleshipCompletetionErrorMsg`,
        });
        setFormErrors({
          ...formErrors,
          ["article_completion_to_date"]: error,
          [name]: validateField(value, fieldRules),
        });
      } else {
        setFormErrors({
          ...formErrors,
          ["article_completion_to_date"]: undefined,
          [name]: validateField(value, fieldRules),
        });
      }
    }
  };

  const validateField = (value, rules) => {
    if (!rules) return undefined;

    for (const rule of rules) {
      if (
        rule.required &&
        (!value ||
          (typeof value === "string"
            ? value?.trim()?.length <= 0
            : value?.length <= 0))
      ) {
        console.log("error");
        return intl.formatMessage({ id: `session.error.${rule.message}` });
      }
      if (rule.regex && !rule.regex.test(value)) {
        return intl.formatMessage({ id: `session.error.${rule.message}` });
      }
    }

    return undefined;
  };

  const handleCancel = () => {
    setFormData(sessionData);
    navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
    setFormErrors({});
  };
  const handleSave = () => {
    if (isObjectHasNoValues(formErrors)) {
      let payload = fields.reduce((acc, item) => {
        acc[item.label] = item.value;
        return acc;
      }, {});
      if (
        currentlySelectedModuleKey ===
        MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY
      ) {
        payload["mcs_completion_date"] = dayjs(
          payload["mcs_completion_date"]
        ).format("YYYY-MM-DD");
        payload["article_completion_from_date"] = dayjs(
          payload["article_completion_from_date"]
        ).format("YYYY-MM-DD");
        payload["article_completion_to_date"] = dayjs(
          payload["article_completion_to_date"]
        ).format("YYYY-MM-DD");
        payload["membership_completion_date"] = dayjs(
          payload["membership_completion_date"]
        ).format("YYYY-MM-DD");
      } else {
        payload["membership_as_on_date"] = dayjs(
          payload["membership_as_on_date"]
        ).format("YYYY-MM-DD");
      }

      if (addSession) {
        addNewSession({
          currentlySelectedModuleKey,
          payload,
          onSuccessCallback: (res) => {
            removeItem(SESSION_KEY);
            getGlobalSessionList(currentlySelectedModuleKey);
            setNotificationStateDispatch(addSessionNotification(true));
            navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
          },
          onErrorCallback: (errString) => {
            showNotification({
              text: errString,
              type: NOTIFICATION_TYPES.ERROR,
            });
          },
        });
      } else {
        updateSessionDetails({
          currentlySelectedModuleKey,
          sessionId: globalSessionDetails?.globalSessionId,
          payload,
          onSuccessCallback: (res) => {
            setNotificationStateDispatch(updateSessionNotification(true));
            navigate(`/${currentlySelectedModuleKey}/${SESSION}`);
          },
          onErrorCallback: (errString) => {
            showNotification({
              text: errString,
              type: NOTIFICATION_TYPES.ERROR,
            });
          },
        });
      }
    }
  };

  const handleTryAgain = () => {
    fetchData({});
  };

  return formData ? (
    <>
      {notificationContextHolder}
      {isGettingSessions && (
        <Base className={styles.noSessionContainer}>
          <CustomLoader />
        </Base>
      )}
      {isSessionError && (
        <Base className={styles.noSessionContainer}>
          <ErrorMessageBox
            onRetry={handleTryAgain}
            errorText={sessionError?.data?.message || sessionError}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </Base>
      )}
      {!isGettingSessions && !isSessionError && (
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
                    !isEditable && sessionData?.is_editable ? (
                      <TwoColumn
                        onClick={() => {
                          navigate(EDIT_SESSION, false);
                        }}
                        className={styles.editContainer}
                        leftSection={
                          <Image
                            src={getImage("editDark")}
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
                    ) : (
                      <></>
                    )
                  }
                />
              }
              bottomSection={
                <CustomGrid>
                  {fields?.map((item) => (
                    <TwoRow
                      key={item.id}
                      className={
                        isEditable ? styles.editGridItem : styles.gridItem
                      }
                      topSection={
                        <Typography className={styles.grayText}>
                          {intl.formatMessage({
                            id: `session.${item.headingIntl}`,
                          })}
                          <span className={styles.redText}> *</span>
                        </Typography>
                      }
                      bottomSection={
                        isEditable ? (
                          <div className={styles.formInputStyles}>
                            {item.id === 5 ||
                            item.id === 6 ||
                            item.id === 7 ||
                            item.id === 8 ||
                            item.id === 12 ? (
                              <DatePicker
                                format="DD/MM/YYYY"
                                disabledDate={(current) => {
                                  if (item.id === 8 && fields?.[6]?.value) {
                                    return current.isBefore(
                                      dayjs(fields?.[6]?.value).add(1, "days")
                                    );
                                  }
                                }}
                                className={styles.dateInput}
                                onChange={(val, dateString) => {
                                  handleInputChange(val, item.label);
                                }}
                                placeholder={intl.formatMessage({
                                  id: `session.placeholder.${item.headingIntl}`,
                                })}
                                value={item.value ? dayjs(item.value) : null}
                                suffixIcon={
                                  <Image src={getImage("calendar")} />
                                }
                              />
                            ) : item.id === 4 ? (
                              <div>
                                <MonthPicker
                                  disabled={item.value?.length > 3}
                                  format="YYYY/MM"
                                  className={styles.multilpleInput}
                                  size={"large"}
                                  placeholder={intl.formatMessage({
                                    id: `session.placeholder.${item.headingIntl}`,
                                  })}
                                  suffixIcon={
                                    <Image src={getImage("calendar")} />
                                  }
                                  onChange={handleMonthChange}
                                  style={classes.multiSelectStyle}
                                  disabledDate={(current) =>
                                    item.value?.includes(
                                      dayjs(current).format("MMM YYYY")
                                    )
                                  }
                                />
                                <div
                                  className={
                                    styles.editExaminationFieldContainer
                                  }
                                >
                                  {item.value?.map((item, index) => {
                                    return (
                                      <div
                                        className={styles.chipContainer}
                                        key={index}
                                      >
                                        <Typography className={styles.chipText}>
                                          {convertDateToStringDate(item)}
                                        </Typography>
                                        <Image
                                          src={getImage("cancel")}
                                          className={styles.crossIcon}
                                          preview={false}
                                          onClick={() => {
                                            handleDeselect(item);
                                          }}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <CustomInput
                                value={item.value}
                                disabled={!isEditable}
                                customLabelStyles={styles.inputLabel}
                                customInputStyles={styles.input}
                                customContainerStyles={
                                  styles.customContainerStyles
                                }
                                maxLength={
                                  item.id === 9
                                    ? 8
                                    : item.id === 10
                                    ? 18
                                    : undefined
                                }
                                onChange={(val) =>
                                  ((item.id === 9 || item.id === 10
                                    ? NUMERIC_VALUE_REGEX.test(val.target.value)
                                    : true) ||
                                    val.target.value === "") &&
                                  handleInputChange(
                                    val.target.value,
                                    item.label
                                  )
                                }
                                placeholder={intl.formatMessage({
                                  id: `session.placeholder.${item.headingIntl}`,
                                })}
                                isError={formErrors[item.label]}
                                errorMessage={formErrors[item.label]}
                              />
                            )}
                            {formErrors[item.label] &&
                              (item.id === 4 ||
                                item.id === 5 ||
                                item.id === 6 ||
                                item.id === 7 ||
                                item.id === 8 ||
                                item.id === 12) && (
                                <Typography className={styles.errorText}>
                                  {formErrors[item.label]}
                                </Typography>
                              )}
                          </div>
                        ) : item.id === 5 ||
                          item.id === 6 ||
                          item.id === 7 ||
                          item.id === 8 ||
                          item.id === 12 ? (
                          <Typography className={styles.blackText}>
                            {formatDate({ date: item.value })}
                          </Typography>
                        ) : item?.id !== 4 ? (
                          <Typography className={styles.blackText}>
                            {item.value}
                          </Typography>
                        ) : (
                          <div className={styles.examinationFieldContainer}>
                            {item.value?.map((val, index) => (
                              <Typography
                                key={index}
                                className={styles.periodText}
                              >
                                {convertDateToStringDate(val)}
                              </Typography>
                            ))}
                          </div>
                        )
                      }
                    />
                  ))}
                </CustomGrid>
              }
            />
          }
          bottomSection={
            !!isEditable && (
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
                      !formData?.nature_of_services ||
                      !formData?.pi_number_format ||
                      (currentlySelectedModuleKey ===
                        MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY &&
                        (!formData?.ps_examination_periods.length > 0 ||
                          !formData?.article_completion_to_date ||
                          !formData?.mcs_completion_date ||
                          !formData?.membership_completion_date ||
                          !formData?.article_completion_from_date)) ||
                      (currentlySelectedModuleKey !==
                        MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY &&
                        !formData?.membership_as_on_date) ||
                      !formData?.hsn_sac_code ||
                      !formData?.bank_ac_no ||
                      !formData?.bank_ac_ifsc
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
      )}
    </>
  ) : (
    <Base className={styles.noSessionContainer}>
      <Typography className={styles.noSessionText}>
        {intl.formatMessage({ id: "label.noSessionSetup" })}
      </Typography>
    </Base>
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
