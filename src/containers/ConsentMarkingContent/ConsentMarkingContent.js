import React, { useCallback, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import ConsentTable from "../ConsentTable";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomTabs from "../../components/CustomTabs";
import EditButton from "../../components/EditButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { compareTwoDayjsDates, isNotAFutureDate } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { usePut } from "../../core/hooks/useApiRequest";
import useShowNotification from "../../core/hooks/useShowNotification";
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
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
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
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [isRegistrationDateEdit, setIsRegistrationDateEdit] = useState(false);
  const [isTableDateEdit, setIsTableDateEdit] = useState(false);
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

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

  const registrationInitialData = lastRegistrationDatesData?.map((item) => ({
    ...item,
    id: item.id,
    name: item.name,
    company_reg_end_date: item.company_reg_end_date
      ? item.company_reg_end_date
      : null,
    psychometric_test_date: item.psychometric_test_date
      ? item.psychometric_test_date
      : null,
  }));

  const [roundOneTableData, setRoundOneTableData] =
    useState(roundOneInitialData);
  const [roundTwoTableData, setRoundTwoTableData] =
    useState(roundTwoInitialData);
  const [registrationTableData, setRegistrationTableData] = useState(
    registrationInitialData
  );

  const disabledDate = (key, current) => {
    if (key === "company_reg_start_date") {
      return isNotAFutureDate(current);
    }
    if (key === "candidate_reg_start_date") {
      return (
        isNotAFutureDate(current) ||
        compareTwoDayjsDates({
          current: current,
          date: registrationDatesData["candidate_reg_end_date_bg_centre"],
          checkForFuture: false,
        })
      );
    }
    if (key === "candidate_reg_end_date_bg_centre")
      return (
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
    return compareTwoDayjsDates({
      current: current,
      date:
        registrationDatesData["candidate_reg_end_date_bg_centre"] ||
        registrationDatesData["candidate_reg_start_date"],
      checkForFuture: false,
    });
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
          }}
          tableData={registrationTableData}
          setTableData={setRegistrationTableData}
        />
      ),
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundOne" }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit: isTableDateEdit }}
          tableData={roundOneTableData}
          setTableData={setRoundOneTableData}
        />
      ),
    },
    isNqca && {
      key: "3",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit: isTableDateEdit }}
          tableData={roundTwoTableData}
          setTableData={setRoundTwoTableData}
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

  const navigateBackToSession = () => {
    navigate(`/${currentlySelectedModuleKey}/${SESSION}?mode=view&tab=2`);
  };

  const handleCancel = () => {
    if (activeTab === "1") {
      setRegistrationTableData(registrationInitialData);
    }
    if (activeTab === "2") {
      setRoundOneTableData(roundOneInitialData);
    }
    if (activeTab === "3") {
      setRoundTwoTableData(roundTwoInitialData);
    }
    setIsTableDateEdit(false);
  };

  const handleSave = () => {
    if (activeTab === "1") {
      updateLastRegistrationDate({
        body: { data: registrationTableData },
        onSuccessCallback: () => {
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
    if (activeTab === "2") {
      updateRoundOneDate({
        body: { data: roundOneTableData },
        onSuccessCallback: () => {
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
  };

  const handleRegistrationCancel = () => {
    setIsRegistrationDateEdit(false);
  };

  const handleRegistrationSave = () => {
    updateRegistrationDate({
      body: registrationDatesData,
      onSuccessCallback: () => {
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

  console.log(registrationTableData, "registrationTableData..");
  console.log(roundOneTableData, "roundOneTableData..");
  console.log(roundTwoTableData, "roundTwoTableData..");

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
                      !isRegistrationDateEdit && (
                        <EditButton
                          disable={!isEdit}
                          onClick={() => setIsRegistrationDateEdit(true)}
                        />
                      )
                    }
                  />
                )}
              </>
            }
            bottomSection={
              isRegistrationDateEdit && (
                <ActionAndCancelButtons
                  customContainerStyle={styles.customContainerStyle}
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
                  !isTableDateEdit && (
                    <EditButton
                      disable={!isEdit}
                      onClick={() => setIsTableDateEdit(true)}
                    />
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
                  isTableDateEdit && (
                    <ActionAndCancelButtons
                      actionBtnText={intl.formatMessage({
                        id: "label.saveChanges",
                      })}
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
