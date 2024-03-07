import React, { useCallback, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ConsentTable from "../ConsentTable";
import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomTabs from "../../components/CustomTabs";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  getCurrentActiveTab,
  handleDisabledDate,
  handleDisabledBeforeDate,
  handleDisabledAfterDate,
} from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { ACTIVE_TAB, MODULE_KEYS } from "../../constant/constant";
import {
  CONSENT_MARKING_REGESTRATION_DETAILS,
  LAST_MARKING_REGESTRATION_DETAILS,
  REGISTRATION_DATES,
} from "../../dummyData";
import { VALID_CONSENT_MARKING_TABS_ID } from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({ isEdit }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      urlService.getQueryStringValue(ACTIVE_TAB),
      VALID_CONSENT_MARKING_TABS_ID
    )
  );
  const [registrationDatesData, setRegistrationDatesData] =
    useState(REGISTRATION_DATES);
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

  const disabledDate = (key, current) => {
    if (key === "startDateCompanies") {
      return handleDisabledDate(current);
    }
    if (key === "startDateCandidates") {
      return (
        handleDisabledDate(current) ||
        handleDisabledAfterDate(
          current,
          registrationDatesData["lastDateBigCentres"]
        )
      );
    }
    if (key === "lastDateBigCentres")
      return (
        handleDisabledBeforeDate(
          current,
          registrationDatesData["startDateCandidates"]
        ) ||
        handleDisabledAfterDate(
          current,
          registrationDatesData["lastDateSmallCentres"]
        )
      );
    return handleDisabledBeforeDate(
      current,
      registrationDatesData["lastDateBigCentres"] ||
        registrationDatesData["startDateCandidates"]
    );
  };

  const registrationDates =
    currentlySelectedModuleKey === MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY
      ? [
          {
            id: 1,
            labeIntl: "startDateCompanies",
          },
          {
            id: 2,
            labeIntl: "startDateCandidates",
          },
          {
            id: 3,
            labeIntl: "lastDateBigCentres",
          },
          {
            id: 4,
            labeIntl: "lastDateSmallCentres",
          },
        ]
      : [
          {
            id: 1,
            labeIntl: "startDateCompanies",
          },
          {
            id: 2,
            labeIntl: "startDateCandidates",
          },
          {
            id: 3,
            labeIntl: "lastDateBigCentres",
          },
        ];

  const tabItems = [
    {
      key: "1",
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
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundOne" }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit, tableData, setTableData }}
          totalData={round1InitialData}
        />
      ),
    },
    currentlySelectedModuleKey ===
      MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY && {
      key: "3",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: (
        <ConsentTable
          {...{ activeTab, isEdit, tableData, setTableData }}
          totalData={round1InitialData}
        />
      ),
    },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleInputChange = (value, name) => {
    setRegistrationDatesData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigateBackToSession = () => {
    navigate(`/${currentlySelectedModuleKey}/${SESSION}?tab=2`);
  };

  const handleCancel = () => {
    navigateBackToSession();
  };

  const handleSave = () => {
    navigateBackToSession();
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
    <ThreeRow
      className={styles.mainContainer}
      topSection={
        <CustomGrid customStyle={styles.customStyle}>
          {registrationDates.map((item) => {
            return (
              <CustomDateTimePicker
                key={item?.id}
                customLabelStyles={styles.customLabelStyles}
                customContainerStyles={styles.customContainerStyles}
                customTimeStyle={styles.customTimeStyle}
                disabledDate={(current) => disabledDate(item.labeIntl, current)}
                isEditable={isEdit}
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
                    ? isEdit
                      ? registrationDatesData[item?.labeIntl]
                      : registrationDatesData[item?.labeIntl]
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
      topSectionStyle={classes.topSectionStyle}
      middleSection={
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
                isBtnDisable={false}
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
  );
};

ConsentMarkingContent.defaultProps = {
  isEdit: false,
};

ConsentMarkingContent.propTypes = {
  isEdit: PropTypes.bool,
};

export default ConsentMarkingContent;
