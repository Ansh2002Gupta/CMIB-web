import React, { useCallback, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Spin } from "antd";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useResponsive from "core/hooks/useResponsive";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  compareTwoDayjsDates,
  formatDate,
  isNotAFutureDate,
} from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { ACTIVE_TAB } from "../../constant/constant";
import {
  VALID_CONSENT_MARKING_TABS_ID,
  REGISTRATION_DATES,
  REGISTRATIONS_DATES_FOR_ROUND_TWO,
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import useRegistrationAndConsentMarking from "../../services/api-services/RegistrationandConsentMarking/useRegistrationConsentMarking";
import { classes } from "./ConsentMarkingContentRoundTwo.styles";
import styles from "./ConsentMarkingContentRoundTwo.module.scss";

const ConsentMarkingContentRoundTwo = ({
  isEdit,
  selectedModule,
  roundId,
  regAndConsentData,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const location = useLocation();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [, setNotificationStateDispatch] = useContext(NotificationContext);

  const [registrationDatesData, setRegistrationDatesData] = useState({
    registrationStartDateCompanies:
      regAndConsentData?.company_reg_start_date || "",
    registrationEndDateCompanies: regAndConsentData?.company_reg_end_date || "",
    registrationStartDateCandidates:
      regAndConsentData?.candidate_reg_start_date || "",
    registrationEndDateCandidates:
      regAndConsentData?.candidate_reg_end_date || "",
    startShortlistingbyCompany:
      regAndConsentData?.company_shortlisting_start_date || "",
    endShortlistingbyCompany:
      regAndConsentData?.company_shortlisting_end_date || "",
    startCondidateConsentmarking:
      regAndConsentData?.candidate_consent_start_date || "",
    endCondidateConsentmarking:
      regAndConsentData?.candidate_consent_end_date || "",
    last_interview_date_roundOne:
      regAndConsentData?.last_interview_date_round1 || "",
    writtenTestDate: regAndConsentData?.psychometric_test_date || "",
  });

  const {
    registrationStartDateCompanies,
    registrationEndDateCompanies,
    registrationStartDateCandidates,
    registrationEndDateCandidates,
    startShortlistingbyCompany,
    endShortlistingbyCompany,
    startCondidateConsentmarking,
    endCondidateConsentmarking,
    writtenTestDate,
  } = registrationDatesData;

  const [errors, setErrors] = useState([]);

  const {
    errorWhileUpdating,
    updateRegistrationAndConsentMarking,
    isError,
    isLoading: isUpdatingRegistrationAndConsent,
  } = useRegistrationAndConsentMarking();

  const hasRoundTwo = location?.pathname.includes("round2");

  const disabledDate = (key, current) => {
    if (isNotAFutureDate(current)) return true;

    const dateLimits = {
      registrationStartDateCompanies: {
        after: [
          "registrationEndDateCompanies",
          "startShortlistingbyCompany",
          "endShortlistingbyCompany",
          "startCondidateConsentmarking",
          "endCondidateConsentmarking",
          "writtenTestDate",
        ],
      },
      registrationEndDateCompanies: {
        before: "registrationStartDateCompanies",
        after: ["startShortlistingbyCompany", "startCondidateConsentmarking"],
      },
      registrationStartDateCandidates: {
        after: [
          "registrationEndDateCandidates",
          "startShortlistingbyCompany",
          "endShortlistingbyCompany",
          "startCondidateConsentmarking",
          "endCondidateConsentmarking",
          "writtenTestDate",
        ],
        before: ["last_interview_date_roundOne"],
      },
      registrationEndDateCandidates: {
        before: [
          "registrationStartDateCandidates",
          "last_interview_date_roundOne",
        ],
        after: "startShortlistingbyCompany",
      },
      startShortlistingbyCompany: {
        before: [
          "registrationEndDateCandidates",
          "registrationEndDateCompanies",
        ],
        after: "endShortlistingbyCompany",
      },
      endShortlistingbyCompany: {
        before: ["startShortlistingbyCompany", "registrationEndDateCandidates"],
        after: "startCondidateConsentmarking",
      },
      startCondidateConsentmarking: {
        before: "endShortlistingbyCompany",
        after: "endCondidateConsentmarking",
      },
      endCondidateConsentmarking: {
        before: [
          "startCondidateConsentmarking",
          "registrationEndDateCandidates",
        ],
        after: "writtenTestDate",
      },
      writtenTestDate: {
        before: "endCondidateConsentmarking",
      },
    };

    // Retrieve the appropriate limits for the current key
    const limits = dateLimits[key];

    if (limits.before) {
      // Check if the current date is before the start limit
      const beforeKeys = Array.isArray(limits.before)
        ? limits.before
        : [limits.before];
      if (
        beforeKeys.some((beforeKey) =>
          compareTwoDayjsDates({
            current,
            date: registrationDatesData[beforeKey],
            checkForFuture: false,
          })
        )
      ) {
        return true;
      }
    }

    // Check if the current date is after the end limit
    if (limits.after) {
      const afterKeys = Array.isArray(limits.after)
        ? limits.after
        : [limits.after];
      if (
        afterKeys.some((afterKey) =>
          compareTwoDayjsDates({
            current,
            date: registrationDatesData[afterKey],
            checkForFuture: true,
          })
        )
      ) {
        return true;
      }
    }

    return false;
  };

  const handleInputChange = (value, name) => {
    const newValue = !!value
      ? formatDate({ date: value, dateFormat: "YYYY-MM-DD" })
      : "";
    setRegistrationDatesData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    if (!newValue && name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const navigateBackToSession = () => {
    navigate(`/${selectedModule}/${SESSION}?mode=view&tab=3`);
  };

  const handleCancel = () => {
    navigateBackToSession();
  };

  const isButtonDisabled = () => {
    if (
      !!registrationStartDateCompanies &&
      !!registrationEndDateCompanies &&
      !!registrationStartDateCandidates &&
      !!registrationEndDateCandidates &&
      !!startShortlistingbyCompany &&
      !!endShortlistingbyCompany &&
      !!startCondidateConsentmarking &&
      !!endCondidateConsentmarking &&
      !!writtenTestDate &&
      registrationStartDateCompanies < registrationEndDateCompanies &&
      registrationStartDateCandidates < registrationEndDateCandidates &&
      startShortlistingbyCompany < endShortlistingbyCompany &&
      startCondidateConsentmarking < endCondidateConsentmarking &&
      writtenTestDate > endCondidateConsentmarking
    ) {
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!isButtonDisabled()) {
      const roundTwoDetailsPayload = {
        company_reg_start_date: registrationStartDateCompanies,
        company_reg_end_date: registrationEndDateCompanies,
        candidate_reg_start_date: registrationStartDateCandidates,
        candidate_reg_end_date: registrationEndDateCandidates,
        company_shortlisting_start_date: startShortlistingbyCompany,
        company_shortlisting_end_date: endShortlistingbyCompany,
        candidate_consent_start_date: startCondidateConsentmarking,
        candidate_consent_end_date: endCondidateConsentmarking,
        psychometric_test_date: writtenTestDate,
      };
      updateRegistrationAndConsentMarking({
        module: selectedModule,
        payload: roundTwoDetailsPayload,
        onSuccessCallback: () => {
          setNotificationStateDispatch(setShowSuccessNotification(true));
          navigateBackToSession();
        },

        roundId,
      });
    }
  };

  useEffect(() => {
    if (!hasRoundTwo) {
      const activeTab = urlService.getQueryStringValue(ACTIVE_TAB);
      if (!VALID_CONSENT_MARKING_TABS_ID.includes(activeTab)) {
        urlService.setQueryStringValue(ACTIVE_TAB, 1);
      }
    }
  }, []);

  const currentRegistrationDates = hasRoundTwo
    ? REGISTRATIONS_DATES_FOR_ROUND_TWO
    : REGISTRATION_DATES;

  const renderContent = () => {
    if (!isUpdatingRegistrationAndConsent && errorWhileUpdating && isError) {
      return (
        <div className={styles.loaderContainer}>
          <ErrorMessageBox
            onRetry={handleSave}
            errorText={errorWhileUpdating}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }

    if (isUpdatingRegistrationAndConsent) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <>
        <ThreeRow
          className={styles.mainContainer}
          topSection={
            <CustomGrid customStyle={styles.customStyle}>
              {currentRegistrationDates?.map((item, index) => {
                return (
                  <CustomDateTimePicker
                    key={item?.id}
                    customLabelStyles={styles.customLabelStyles}
                    customContainerStyles={styles.customContainerStyles}
                    customTimeStyle={styles.customTimeStyle}
                    isEditable={isEdit}
                    type="date"
                    isRequired
                    label={intl.formatMessage({
                      id: `label.consent.${item?.labeIntl}`,
                    })}
                    placeholder={intl.formatMessage({
                      id: `label.consent.placeholder.${item?.labeIntl}`,
                    })}
                    disabledDate={(current) =>
                      disabledDate(item.labeIntl, current)
                    }
                    value={
                      registrationDatesData[item?.labeIntl]
                        ? isEdit
                          ? registrationDatesData[item?.labeIntl]
                          : registrationDatesData[item?.labeIntl]
                        : null
                    }
                    onChange={(val) => {
                      handleInputChange(val, item?.labeIntl);
                    }}
                    errorMessage={errors[item?.labeIntl]}
                  />
                );
              })}
            </CustomGrid>
          }
          topSectionStyle={classes.topSectionStyle}
          middleSection={!hasRoundTwo ? <></> : <></>}
          bottomSection={
            isEdit ? (
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
                    isBtnDisable={isButtonDisabled()}
                    textStyle={styles.saveButtonTextStyles}
                    btnText={intl.formatMessage({
                      id: "session.saveChanges",
                    })}
                    onClick={handleSave}
                  />
                }
              />
            ) : (
              <></>
            )
          }
          bottomSectionStyle={classes.bottomSectionStyle}
        />
      </>
    );
  };

  return renderContent();
};

ConsentMarkingContentRoundTwo.defaultProps = {
  isEdit: false,
};

ConsentMarkingContentRoundTwo.propTypes = {
  isEdit: PropTypes.bool,
};

export default ConsentMarkingContentRoundTwo;
