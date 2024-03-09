import React, { useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ConsentTable from "../ConsentTable";
import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomTabs from "../../components/CustomTabs";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  formatDate,
  getCurrentActiveTab,
  handleDisabledAfterDate,
  handleDisabledBeforeDate,
  handleDisabledDate,
} from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { ACTIVE_TAB } from "../../constant/constant";
import {
  CONSENT_MARKING_REGESTRATION_DETAILS,
  LAST_MARKING_REGESTRATION_DETAILS,
} from "../../dummyData";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_CONSENT_MARKING_TABS_ID,
  REGISTRATION_DATES,
  REGISTRATIONS_DATES_FOR_ROUND_TWO,
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
import { classes } from "./ConsentMarkingContent.styles";
import { Spin } from "antd";
import useRegistrationAndConsentMarking from "../../services/api-services/RegistrationandConsentMarking/useRegistrationConsentMarking";
import useShowNotification from "../../core/hooks/useShowNotification";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({
  isEdit,
  selectedModule,
  roundId,
  regAndConsentData,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const location = useLocation();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_CONSENT_MARKING_TABS_ID
    )
  );
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
  const round1InitialData = CONSENT_MARKING_REGESTRATION_DETAILS.map(
    (item) => ({
      ...item,
      sNo: item.sNo,
      centreName: item.centreName,
      companyStartDate: item.companyStartDate ? item.companyStartDate : null,
      companyEndDate: item.companyEndDate ? item.companyEndDate : null,
      consentFromDate: item.consentFromDate ? item.consentFromDate : null,
      consentToDate: item.consentToDate ? item.consentToDate : null,
    })
  );

  const registrationInitialData = LAST_MARKING_REGESTRATION_DETAILS.map(
    (item) => ({
      ...item,
      sNo: item.sNo,
      centreName: item.centreName,
      lastRegistrationDate: item.lastRegistrationDate
        ? item.lastRegistrationDate
        : null,
      psychometricTestDate: item.psychometricTestDate
        ? item.psychometricTestDate
        : null,
    })
  );

  const [tableData, setTableData] = useState(round1InitialData);
  const [registrationTableData, setRegistrationTableData] = useState(
    registrationInitialData
  );

  const {
    errorWhileUpdating,
    updateRegistrationAndConsentMarking,
    isError,
    isLoading: isRegAncConfigLoading,
  } = useRegistrationAndConsentMarking();

  const hasRoundTwo = location?.pathname.includes("round2");

  const disabledDate = (key, current) => {
    if (handleDisabledDate(current)) return true;

    const dateLimits = {
      registrationStartDateCompanies: {
        after: [
          "registrationEndDateCompanies",
          "startShortlistingbyCompany",
          "startCondidateConsentmarking",
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
          "startCondidateConsentmarking",
        ],
      },
      registrationEndDateCandidates: {
        before: "registrationStartDateCandidates",
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

    // Check if the current date is before the start limit
    if (limits.before) {
      const beforeKeys = Array.isArray(limits.before)
        ? limits.before
        : [limits.before];
      if (
        beforeKeys.some((beforeKey) =>
          handleDisabledBeforeDate(current, registrationDatesData[beforeKey])
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
          handleDisabledAfterDate(current, registrationDatesData[afterKey])
        )
      ) {
        return true;
      }
    }

    return false;
  };

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "session.roundOne" }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit, tableData, setTableData }}
          totalData={round1InitialData}
        />
      ),
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: <>Round2</>,
    },
    {
      key: "3",
      title: intl.formatMessage({
        id: "session.lastDateRegistrationCompanies",
      }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit, registration: true }}
          tableData={registrationTableData}
          setTableData={setRegistrationTableData}
          totalData={registrationInitialData}
        />
      ),
    },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

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
        [name]: intl.formatMessage({ id: "label.this_field_is_required" }),
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
      const hasRoundTwoDetails = {
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
        payload: hasRoundTwoDetails,
        onSuccessCallback: () => {
          showNotification({
            text: "Dates Added Successfully",
            type: "success",
          });
          setTimeout(() => {
            navigateBackToSession();
          }, 1000);
        },
        roundId: roundId,
      });
    }
  };

  const setPageSizeAndNumberToDefault = () => {
    const queryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: DEFAULT_PAGE_SIZE,
    };
    urlService.setMultipleQueryStringValues(queryParams);
  };

  const setTableToDefault = () => {
    const startIndex = 0;
    const endIndex = DEFAULT_PAGE_SIZE;
    const round1UpdatedData = round1InitialData.slice(startIndex, endIndex);
    setTableData(round1UpdatedData);
    const registrationUpdatedData = registrationInitialData.slice(
      startIndex,
      endIndex
    );
    registrationTableData(registrationUpdatedData);
  };

  const handleOnTabSwitch = useCallback((tabId) => {
    setActiveTab(tabId);
    setPageSizeAndNumberToDefault();
    setTableToDefault();
  }, []);

  useEffect(() => {
    const activeTab = urlService.getQueryStringValue(ACTIVE_TAB);
    if (!VALID_CONSENT_MARKING_TABS_ID.includes(activeTab)) {
      urlService.setQueryStringValue(ACTIVE_TAB, 1);
    }
  }, []);

  const currentRegistrationDates = hasRoundTwo
    ? REGISTRATIONS_DATES_FOR_ROUND_TWO
    : REGISTRATION_DATES;

  const renderContent = () => {
    if (!isRegAncConfigLoading && errorWhileUpdating && isError) {
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

    if (isRegAncConfigLoading) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <>
        {notificationContextHolder}
        <ThreeRow
          className={styles.mainContainer}
          topSection={
            <CustomGrid customStyle={styles.customStyle}>
              {currentRegistrationDates.map((item, index) => {
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
          middleSection={
            !hasRoundTwo && (
              <TwoRow
                className={styles.tabContainer}
                topSection={
                  <CustomTabs
                    tabs={tabItems}
                    activeTab={activeTab}
                    setActiveTab={handleOnTabSwitch}
                    tabsKeyText={ACTIVE_TAB}
                  />
                }
                topSectionStyle={classes.tabTopSectionStyle}
                bottomSection={activeTabChildren.children}
                bottomSectionStyle={classes.tabBottomSectionStyle}
              />
            )
          }
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
            ) : null
          }
          bottomSectionStyle={classes.bottomSectionStyle}
        />
      </>
    );
  };

  return renderContent();
};

ConsentMarkingContent.defaultProps = {
  isEdit: false,
};

ConsentMarkingContent.propTypes = {
  isEdit: PropTypes.bool,
};

export default ConsentMarkingContent;
