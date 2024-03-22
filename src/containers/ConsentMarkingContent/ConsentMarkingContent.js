import React, { useCallback, useState, useEffect } from "react";
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
import {
  disabledDate,
  handleInputChange,
  onDateChange,
  useIntitalDataAndError,
  validate,
  NQCA_REGISTRATION_DATE_FIELDS,
  OTHER_MODULES_REGISTRATION_DATE_FIELDS,
} from "./ConsentMarkingConfig";
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
  UPDATED_API_VERSION,
} from "../../constant/apiEndpoints";
import {
  ACTIVE_TAB,
  API_VERSION_QUERY_PARAM,
  VALID_CONSENT_MARKING_TABS_ID,
  MODULE_KEYS,
  NOTIFICATION_TYPES,
  SESSION_ID_QUERY_PARAM,
} from "../../constant/constant";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({
  activeTab,
  consentRoundOneData,
  consentRoundTwoData,
  currentlySelectedModuleKey,
  isEdit,
  lastRegistrationDatesData,
  roundId,
  registrationDateData,
  setActiveTab,
  sessionId,
  showNotification,
}) => {
  const intl = useIntl();
  const [isRegistrationDateEdit, setIsRegistrationDateEdit] = useState(false);
  const [isTableDateEdit, setIsTableDateEdit] = useState(false);
  const {
    makeRequest: updateRegistrationDate,
    isLoading: isUpdatingRegistrationDate,
  } = usePut({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      REGISTRATION_DATES +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
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
      LAST_REGISTRATION_DATES +
      `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: { headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION } },
  });
  const { makeRequest: updateRoundOneDate, isLoading: isUpdatingRoundOneDate } =
    usePut({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        REGISTRATION_CONSENT +
        ROUND_ONE +
        `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      apiOptions: {
        headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION },
      },
    });
  const { makeRequest: updateRoundTwoDate, isLoading: isUpdatingRoundTwoDate } =
    usePut({
      url:
        CORE_ROUTE +
        `/${currentlySelectedModuleKey}` +
        ROUNDS +
        `/${roundId}` +
        REGISTRATION_CONSENT +
        ROUND_TWO +
        `?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
      apiOptions: {
        headers: { [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION },
      },
    });

  const [registrationDatesData, setRegistrationDatesData] =
    useState(registrationDateData);

  const [registrationError, setRegistrationError] = useState({
    candidate_reg_end_date_bg_centre: "",
    candidate_reg_end_date_sm_centre: "",
    candidate_reg_start_date: "",
    company_reg_start_date: "",
  });

  const isNqca =
    currentlySelectedModuleKey === MODULE_KEYS?.NEWLY_QUALIFIED_PLACEMENTS_KEY;

  const {
    roundOneInitialData,
    roundTwoInitialData,
    lastRegistrationInitialData,
    roundOneInitialError,
    roundTwoInitialError,
    lastRegistrationInitialError,
  } = useIntitalDataAndError({
    consentRoundOneData,
    consentRoundTwoData,
    lastRegistrationDatesData,
  });

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

  const [lastCompanyRegistrationDate, setLastCompanyRegistrationDate] =
    useState();

  let min = !!lastRegistrationInitialData.length
    ? lastRegistrationInitialData[0]?.company_reg_end_date
    : "";

  useEffect(() => {
    if (!!lastRegistrationInitialData?.length) {
      lastRegistrationInitialData.map((item) => {
        if (min >= item.company_reg_end_date) {
          min = item.company_reg_end_date;
        }
      });
      setLastCompanyRegistrationDate(min);
    }
  }, [min, lastRegistrationTableData]);

  useEffect(() => {
    setRoundOneTableData(roundOneInitialData);
    setRoundTwoTableData(roundTwoInitialData);
    setLastRegistrationTableData(lastRegistrationInitialData);
    setRegistrationDatesData(registrationDateData);
  }, [
    roundOneInitialData,
    roundTwoInitialData,
    lastRegistrationInitialData,
    registrationDateData,
  ]);

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
              intl,
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
              intl,
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
                intl,
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
    if (
      validate({
        activeTab,
        intl,
        lastRegistrationTableData,
        roundOneTableData,
        roundTwoTableData,
        setLastRegistrationError,
        setRoundOneError,
        setRoundTwoError,
      })
    ) {
      if (activeTab === "1") {
        updateLastRegistrationDate({
          body: { data: lastRegistrationTableData },
          onSuccessCallback: () => {
            setRegistrationDatesData((prev) => {
              return { ...prev, is_round1_visible: true };
            });
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
            setRegistrationDatesData((prev) => {
              return { ...prev, is_round2_visible: true };
            });
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
    setRegistrationDatesData(registrationDateData);
    setRegistrationError({
      candidate_reg_end_date_bg_centre: "",
      candidate_reg_end_date_sm_centre: "",
      candidate_reg_start_date: "",
      company_reg_start_date: "",
    });
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
    if (registrationDatesData?.is_round2_visible) {
      if (!VALID_CONSENT_MARKING_TABS_ID?.threeTab?.includes(activeTab)) {
        urlService.setQueryStringValue(ACTIVE_TAB, 1);
        setActiveTab("1");
      }
      return;
    }
    if (registrationDatesData?.is_round1_visible) {
      if (!VALID_CONSENT_MARKING_TABS_ID.twoTab.includes(activeTab)) {
        urlService.setQueryStringValue(ACTIVE_TAB, 1);
        setActiveTab("1");
      }
      return;
    }
    if (!VALID_CONSENT_MARKING_TABS_ID.oneTab.includes(activeTab)) {
      urlService.setQueryStringValue(ACTIVE_TAB, 1);
      setActiveTab("1");
    }
  }, [urlService, activeTab]);

  return (
    <>
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <>
            {isUpdatingRegistrationDate && <CustomLoader />}
            {!isUpdatingRegistrationDate && (
              <TwoRow
                topSection={
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
                                disabledDate(
                                  item.labeIntl,
                                  current,
                                  registrationDatesData,
                                  lastCompanyRegistrationDate
                                )
                              }
                              errorMessage={registrationError[item?.labeIntl]}
                              isEditable={isRegistrationDateEdit}
                              type="date"
                              isRequired
                              isSpacedError
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
                                handleInputChange(
                                  val,
                                  item?.labeIntl,
                                  setRegistrationDatesData,
                                  setRegistrationError,
                                  intl
                                );
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
            )}
          </>
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
                topSection={activeTabChildren?.children}
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
