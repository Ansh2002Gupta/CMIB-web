import React, { useCallback, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { TwoColumn, TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import ConsentTable from "../ConsentTable";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomTabs from "../../components/CustomTabs";
import EditButton from "../../components/EditButton";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useShowNotification from "../../core/hooks/useShowNotification";
import { compareTwoDayjsDates, isNotAFutureDate } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { usePut } from "../../core/hooks/useApiRequest";
import {
  CORE_ROUTE,
  LAST_REGISTRATION_DATES,
  REGISTRATION_CONSENT,
  REGISTRATION_DATES,
  ROUNDS,
  ROUND_ONE,
  ROUND_TWO,
} from "../../constant/apiEndpoints";
import {
  ACTIVE_TAB,
  VALID_CONSENT_MARKING_TABS_ID,
  MODULE_KEYS,
  NOTIFICATION_TYPES,
} from "../../constant/constant";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({
  activeTab,
  consentRoundOneData,
  consentRoundTwoData,
  isEdit,
  lastRegistrationDatesData,
  roundId,
  registrationDateData,
  setActiveTab,
}) => {
  const intl = useIntl();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [isRegistrationDateEdit, setIsRegistrationDateEdit] = useState(false);
  const [isTableDateEdit, setIsTableDateEdit] = useState(false);
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const onDateChange = (
    record,
    key,
    value,
    tableData,
    setTableData,
    setErrors
  ) => {
    const index = tableData.findIndex((item) => item.id === record.id);
    const newData = [...tableData];
    newData[index][key] = value && dayjs(value).format("YYYY-MM-DD");
    setTableData(newData);
    if (!value) {
      handleError(
        key,
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        index,
        setErrors
      );
    } else {
      handleError(key, "", index, setErrors);
    }
  };

  const {
    makeRequest: updateRegistrationDate,
    isLoading: isUpdatingRegistrationDate,
  } = usePut({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_DATES,
  });

  const {
    makeRequest: updateLastRegistrationDate,
    isLoading: isUpdatingLastRegistrationDate,
  } = usePut({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      LAST_REGISTRATION_DATES,
  });
  const { makeRequest: updateRoundOneDate, isLoading: isUpdatingRoundOneDate } =
    usePut({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        REGISTRATION_CONSENT +
        ROUND_ONE,
    });
  const { makeRequest: updateRoundTwoDate, isLoading: isUpdatingRoundTwoDate } =
    usePut({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        REGISTRATION_CONSENT +
        ROUND_TWO,
    });

  const [registrationDatesData, setRegistrationDatesData] =
    useState(registrationDateData);

  const isNqca =
    currentlySelectedModuleKey === MODULE_KEYS?.NEWLY_QUALIFIED_PLACEMENTS_KEY;

  const roundOneInitialData = consentRoundOneData?.map((item) => ({
    ...item,
    sNo: item.id,
    centre_name: item.centre_name,
    company_shortlisting_start_date: item.company_shortlisting_start_date
      ? item.company_shortlisting_start_date
      : null,
    company_shortlisting_end_date: item.company_shortlisting_end_date
      ? item.company_shortlisting_end_date
      : null,
    candidate_consent_marking_start_date:
      item.candidate_consent_marking_start_date
        ? item.candidate_consent_marking_start_date
        : null,
    candidate_consent_marking_end_date: item.candidate_consent_marking_end_date
      ? item.candidate_consent_marking_end_date
      : null,
  }));

  const roundTwoInitialData = consentRoundTwoData?.map((item) => ({
    ...item,
    id: item.id,
    centre_name: item.centre_name,
    company_shortlisting_start_date: item.company_shortlisting_start_date
      ? item.company_shortlisting_start_date
      : null,
    company_shortlisting_end_date: item.company_shortlisting_end_date
      ? item.company_shortlisting_end_date
      : null,
    candidate_consent_marking_start_date:
      item.candidate_consent_marking_start_date
        ? item.candidate_consent_marking_start_date
        : null,
    candidate_consent_marking_end_date: item.candidate_consent_marking_end_date
      ? item.candidate_consent_marking_end_date
      : null,
  }));

  const lastRegistrationInitialData = lastRegistrationDatesData?.map(
    (item) => ({
      ...item,
      id: item.id,
      name: item.name,
      company_reg_end_date: item.company_reg_end_date
        ? item.company_reg_end_date
        : null,
      psychometric_test_date: item.psychometric_test_date
        ? item.psychometric_test_date
        : null,
    })
  );

  const lastRegistrationInitialError = lastRegistrationDatesData?.map(
    (item) => ({
      name: "",
      company_reg_end_date: "",
      psychometric_test_date: "",
    })
  );

  const roundOneInitialError = consentRoundOneData?.map((item) => ({
    centre_name: "",
    company_shortlisting_start_date: "",
    company_shortlisting_end_date: "",
    candidate_consent_marking_start_date: "",
    candidate_consent_marking_end_date: "",
  }));

  const roundTwoInitialError = consentRoundTwoData?.map((item) => ({
    centre_name: "",
    company_shortlisting_start_date: "",
    company_shortlisting_end_date: "",
    candidate_consent_marking_start_date: "",
    candidate_consent_marking_end_date: "",
  }));

  const [lastRegistrationError, setLastRegistrationError] = useState(
    lastRegistrationInitialError
  );
  const [roundOneError, setRoundOneError] = useState(roundOneInitialError);
  const [roundTwoError, setRoundTwoError] = useState(roundTwoInitialError);

  const [roundOneTableData, setRoundOneTableData] =
    useState(roundOneInitialData);
  const [roundTwoTableData, setRoundTwoTableData] =
    useState(roundTwoInitialData);
  const [lastRegistrationTableData, setLastRegistrationTableData] = useState(
    lastRegistrationInitialData
  );

  const disabledDate = (key, current) => {
    if (key === "company_reg_start_date") {
      return (
        isNotAFutureDate(current) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_bg_centre"],
          checkForFuture: true,
        }) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_sm_centre"],
          checkForFuture: true,
        })
      );
    }
    if (key === "candidate_reg_start_date") {
      return (
        isNotAFutureDate(current) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_bg_centre"],
          checkForFuture: true,
        }) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_sm_centre"],
          checkForFuture: true,
        })
      );
    }
    if (key === "candidate_reg_end_date_bg_centre")
      return (
        isNotAFutureDate(current) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["company_reg_start_date"],
          checkForFuture: false,
        }) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_start_date"],
          checkForFuture: false,
        }) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_sm_centre"],
          checkForFuture: true,
        })
      );
    return (
      isNotAFutureDate(current) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["company_reg_start_date"],
        checkForFuture: false,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date: registrationDatesData["candidate_reg_start_date"],
        checkForFuture: false,
      }) ||
      compareTwoDayjsDates({
        current: current,
        date:
          registrationDatesData["candidate_reg_end_date_bg_centre"] ||
          registrationDatesData["candidate_reg_start_date"],
        checkForFuture: false,
      })
    );
  };
  const NQCA_REGISTRATION_DATE_FIELDS = [
    {
      id: 1,
      labeIntl: "company_reg_start_date",
    },
    {
      id: 2,
      labeIntl: "candidate_reg_start_date",
    },
    {
      id: 3,
      labeIntl: "candidate_reg_end_date_bg_centre",
    },
    {
      id: 4,
      labeIntl: "candidate_reg_end_date_sm_centre",
    },
  ];

  const OTHER_MODULES_REGISTRATION_DATE_FIELDS = [
    {
      id: 1,
      labeIntl: "company_reg_start_date",
    },
    {
      id: 2,
      labeIntl: "candidate_reg_start_date",
    },
    {
      id: 3,
      labeIntl: "candidate_reg_end_date_bg_centre",
    },
  ];

  const registrationDates = isNqca
    ? NQCA_REGISTRATION_DATE_FIELDS
    : OTHER_MODULES_REGISTRATION_DATE_FIELDS;

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({
        id: "session.lastDateRegistrationCompanies",
      }),
      children: (
        <ConsentTable
          {...{
            activeTab,
            isEdit: isTableDateEdit,
            registration: true,
            errors: lastRegistrationError,
            registrationDatesData,
          }}
          tableData={lastRegistrationTableData}
          onDateChange={(record, key, value) => {
            onDateChange(
              record,
              key,
              value,
              lastRegistrationTableData,
              setLastRegistrationTableData,
              setLastRegistrationError
            );
          }}
        />
      ),
    },

    registrationDatesData?.is_round1_visible && {
      key: "2",
      title: intl.formatMessage({ id: "session.roundOne" }),
      children: (
        <ConsentTable
          {...{
            activeTab,
            isEdit: isTableDateEdit,
            errors: roundOneError,
            registrationDatesData,
          }}
          tableData={roundOneTableData}
          onDateChange={(record, key, value) => {
            onDateChange(
              record,
              key,
              value,
              roundOneTableData,
              setRoundOneTableData,
              setRoundOneError
            );
          }}
        />
      ),
    },
    isNqca &&
      registrationDatesData?.is_round2_visible && {
        key: "3",
        title: intl.formatMessage({ id: "session.roundTwo" }),
        children: (
          <ConsentTable
            {...{
              activeTab,
              isEdit: isTableDateEdit,
              errors: roundTwoError,
              registrationDatesData,
            }}
            tableData={roundTwoTableData}
            onDateChange={(record, key, value) => {
              onDateChange(
                record,
                key,
                value,
                roundTwoTableData,
                setRoundTwoTableData,
                setRoundTwoError
              );
            }}
          />
        ),
      },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleInputChange = (value, name) => {
    setRegistrationDatesData((prevFormData) => ({
      ...prevFormData,
      [name]: value && dayjs(value).format("YYYY-MM-DD"),
    }));
  };

  const handleError = (key, error, index, setErrors) => {
    setErrors((prevTableError) => {
      const newTableError = [...prevTableError];
      newTableError[index] = {
        ...newTableError[index],
        [key]: error,
      };
      return newTableError;
    });
  };

  const validate = () => {
    let errorCount = 0;
    if (activeTab === "1") {
      lastRegistrationTableData.map((item, index) => {
        if (!item?.company_reg_end_date) {
          errorCount++;
          handleError(
            "company_reg_end_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setLastRegistrationError
          );
        }
        if (!item?.psychometric_test_date) {
          errorCount++;
          handleError(
            "psychometric_test_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setLastRegistrationError
          );
        }
      });
    }
    if (activeTab === "2") {
      roundOneTableData.map((item, index) => {
        if (!item?.candidate_consent_marking_end_date) {
          errorCount++;
          handleError(
            "candidate_consent_marking_end_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundOneError
          );
        }
        if (!item?.candidate_consent_marking_start_date) {
          errorCount++;
          handleError(
            "candidate_consent_marking_start_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundOneError
          );
        }
        if (!item?.company_shortlisting_end_date) {
          errorCount++;
          handleError(
            "company_shortlisting_end_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundOneError
          );
        }
        if (!item?.company_shortlisting_start_date) {
          errorCount++;
          handleError(
            "company_shortlisting_start_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundOneError
          );
        }
      });
    }
    if (activeTab === "3") {
      roundTwoTableData.map((item, index) => {
        if (!item?.candidate_consent_marking_end_date) {
          errorCount++;
          handleError(
            "candidate_consent_marking_end_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundTwoError
          );
        }
        if (!item?.candidate_consent_marking_start_date) {
          errorCount++;
          handleError(
            "candidate_consent_marking_start_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundTwoError
          );
        }
        if (!item?.company_shortlisting_end_date) {
          errorCount++;
          handleError(
            "company_shortlisting_end_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundTwoError
          );
        }
        if (!item?.company_shortlisting_start_date) {
          errorCount++;
          handleError(
            "company_shortlisting_start_date",
            intl.formatMessage({ id: "label.error.fieldEmpty" }),
            index,
            setRoundTwoError
          );
        }
      });
    }
    if (errorCount) {
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    if (activeTab === "1") {
      setLastRegistrationTableData(lastRegistrationInitialData);
      setLastRegistrationError(lastRegistrationInitialError);
    }
    if (activeTab === "2") {
      setRoundOneTableData(roundOneInitialData);
      setRoundOneError(roundOneInitialError);
    }
    if (activeTab === "3") {
      setRoundTwoTableData(roundTwoInitialData);
      setRoundTwoError(roundTwoInitialError);
    }
    setIsTableDateEdit(false);
  };

  const handleSave = () => {
    if (validate()) {
      if (activeTab === "1") {
        updateLastRegistrationDate({
          body: { data: lastRegistrationTableData },
          onSuccessCallback: () => {
            showNotification({
              text: intl.formatMessage({ id: "label.lastRegistrationSuccess" }),
              type: NOTIFICATION_TYPES.SUCCESS,
            });
            setIsTableDateEdit(false);
          },
          onErrorCallback: (ErrorMessage) => {
            showNotification({
              text: ErrorMessage,
              type: NOTIFICATION_TYPES.ERROR,
              headingText: intl.formatMessage({ id: "label.errorMessage" }),
            });
          },
        });
        return;
      }
      if (activeTab === "2") {
        updateRoundOneDate({
          body: { data: roundOneTableData },
          onSuccessCallback: () => {
            showNotification({
              text: intl.formatMessage({ id: "label.roundOneDatesSuccess" }),
              type: NOTIFICATION_TYPES.SUCCESS,
            });
            setIsTableDateEdit(false);
          },
          onErrorCallback: (ErrorMessage) => {
            showNotification({
              text: ErrorMessage,
              type: "error",
              headingText: intl.formatMessage({ id: "label.errorMessage" }),
            });
          },
        });
        return;
      }
      if (activeTab === "3") {
        updateRoundTwoDate({
          body: { data: roundTwoTableData },
          onSuccessCallback: () => {
            showNotification({
              text: intl.formatMessage({ id: "label.roundTwoDatesSuccess" }),
              type: NOTIFICATION_TYPES.SUCCESS,
            });
            setIsTableDateEdit(false);
          },
          onErrorCallback: (ErrorMessage) => {
            showNotification({
              text: ErrorMessage,
              type: "error",
              headingText: intl.formatMessage({ id: "label.errorMessage" }),
            });
          },
        });
        return;
      }
    }
  };

  const handleRegistrationCancel = () => {
    setIsRegistrationDateEdit(false);
  };

  const handleRegistrationSave = () => {
    updateRegistrationDate({
      body: registrationDatesData,
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.registrationSuccess" }),
          type: NOTIFICATION_TYPES.SUCCESS,
        });
        setIsRegistrationDateEdit(false);
      },
      onErrorCallback: (ErrorMessage) => {
        showNotification({
          text: ErrorMessage,
          type: "error",
          headingText: intl.formatMessage({ id: "label.errorMessage" }),
        });
      },
    });
  };

  const handleOnTabSwitch = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  useEffect(() => {
    const activeTab = urlService.getQueryStringValue(ACTIVE_TAB);
    if (!VALID_CONSENT_MARKING_TABS_ID.includes(activeTab)) {
      urlService.setQueryStringValue(ACTIVE_TAB, 1);
    }
  }, []);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <TwoRow
            topSection={
              <>
                {isUpdatingRegistrationDate && <CustomLoader />}
                {!isUpdatingRegistrationDate && (
                  <TwoColumn
                    leftSection={
                      <CustomGrid customStyle={styles.customStyle}>
                        {registrationDates?.map((item) => {
                          return (
                            <CustomDateTimePicker
                              key={item?.id}
                              customLabelStyles={styles.customLabelStyles}
                              customContainerStyles={
                                styles.customContainerStyles
                              }
                              customTimeStyle={styles.customTimeStyle}
                              disabledDate={(current) =>
                                disabledDate(item.labeIntl, current)
                              }
                              isEditable={isRegistrationDateEdit}
                              type="date"
                              isRequired
                              label={intl.formatMessage({
                                id: `label.consent.${item?.labeIntl}`,
                              })}
                              placeholder={intl.formatMessage({
                                id: `label.consent.placeholder.${item?.labeIntl}`,
                              })}
                              value={
                                registrationDatesData[item?.labeIntl]
                                  ? registrationDatesData[item?.labeIntl]
                                  : null
                              }
                              onChange={(val) => {
                                handleInputChange(val, item?.labeIntl);
                              }}
                            />
                          );
                        })}
                      </CustomGrid>
                    }
                    isLeftFillSpace
                    rightSection={
                      !isRegistrationDateEdit ? (
                        <EditButton
                          disable={!isEdit}
                          onClick={() => setIsRegistrationDateEdit(true)}
                        />
                      ) : (
                        <></>
                      )
                    }
                    rightSectionStyle={classes.editStyles}
                  />
                )}
              </>
            }
            bottomSection={
              isRegistrationDateEdit ? (
                <ActionAndCancelButtons
                  customContainerStyle={styles.customContainerStyle}
                  customActionBtnStyles={styles.button}
                  customCancelBtnStyles={styles.button}
                  actionBtnText={intl.formatMessage({
                    id: "label.saveChanges",
                  })}
                  cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                  onActionBtnClick={handleRegistrationSave}
                  isActionBtnDisable={
                    !registrationDatesData?.company_reg_start_date ||
                    !registrationDatesData?.candidate_reg_start_date ||
                    !registrationDatesData?.candidate_reg_end_date_bg_centre ||
                    (isNqca &&
                      !registrationDatesData?.candidate_reg_end_date_sm_centre)
                  }
                  onCancelBtnClick={handleRegistrationCancel}
                  isctionButtonLoading={isUpdatingRegistrationDate}
                />
              ) : (
                <></>
              )
            }
          />
        }
        topSectionStyle={classes.topSectionStyle}
        bottomSection={
          <TwoRow
            className={styles.tabContainer}
            topSection={
              <TwoColumn
                className={styles.tabEdit}
                isLeftFillSpace
                leftSection={
                  <CustomTabs
                    tabs={tabItems}
                    activeTab={activeTab}
                    setActiveTab={handleOnTabSwitch}
                    tabsKeyText={ACTIVE_TAB}
                  />
                }
                rightSection={
                  !isTableDateEdit &&
                  (lastRegistrationTableData?.length ||
                    roundOneTableData?.length ||
                    roundTwoTableData?.length) ? (
                    <EditButton
                      disable={!isEdit}
                      onClick={() => setIsTableDateEdit(true)}
                    />
                  ) : (
                    <></>
                  )
                }
              />
            }
            topSectionStyle={classes.tabTopSectionStyle}
            bottomSection={
              <TwoRow
                className={styles.tableDataContainer}
                topSection={activeTabChildren.children}
                bottomSection={
                  isTableDateEdit ? (
                    <ActionAndCancelButtons
                      actionBtnText={intl.formatMessage({
                        id: "label.saveChanges",
                      })}
                      customActionBtnStyles={styles.button}
                      customCancelBtnStyles={styles.button}
                      cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                      onActionBtnClick={handleSave}
                      isActionBtnDisable={
                        isUpdatingLastRegistrationDate ||
                        isUpdatingRoundOneDate ||
                        isUpdatingRoundTwoDate
                      }
                      onCancelBtnClick={handleCancel}
                      isctionButtonLoading={
                        isUpdatingLastRegistrationDate ||
                        isUpdatingRoundOneDate ||
                        isUpdatingRoundTwoDate
                      }
                    />
                  ) : (
                    <></>
                  )
                }
              />
            }
            bottomSectionStyle={classes.tabBottomSectionStyle}
          />
        }
      />
    </>
  );
};

ConsentMarkingContent.defaultProps = {
  isEdit: false,
};

ConsentMarkingContent.propTypes = {
  isEdit: PropTypes.bool,
};

export default ConsentMarkingContent;
