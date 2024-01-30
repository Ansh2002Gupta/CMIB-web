import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ConsentTable from "../ConsentTable";
import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomTabs from "../../components/CustomTabs";
import { getCurrentActiveTab } from "../../constant/utils";
import { ACTIVE_TAB } from "../../constant/constant";
import {
  CONSENT_MARKING_REGESTRATION_DETAILS,
  LAST_MARKING_REGESTRATION_DETAILS,
  REGISTRATION_DATES,
} from "../../dummyData";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_CONSENT_MARKING_TABS_ID,
} from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({ isEdit }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [activeTab, setActiveTab] = useState(
    getCurrentActiveTab(
      searchParams.get(ACTIVE_TAB),
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

  const RegistrationDates = [
    { id: 1, labeIntl: "startDateCompanies" },
    { id: 2, labeIntl: "startDateCandidates" },
    { id: 3, labeIntl: "lastDateBigCentres" },
    { id: 4, labeIntl: "lastDateSmallCentres" },
  ];

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
    setRegistrationDatesData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate(`${SESSION}?tab=2`);
  };

  const handleSave = () => {
    navigate(`${SESSION}?tab=2`);
  };

  const setPageSizeAndNumberToDefault = () => {
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
      return prev;
    });
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
    const activeTab = searchParams.get(ACTIVE_TAB);
    if (!VALID_CONSENT_MARKING_TABS_ID.includes(activeTab)) {
      setSearchParams((prev) => {
        prev.set(ACTIVE_TAB, 1);
        return prev;
      });
    }
  }, []);

  console.log(tableData, "tableData");
  console.log(registrationTableData, "registrationTableData");

  return (
    <ThreeRow
      className={styles.mainContainer}
      topSection={
        <CustomGrid customStyle={styles.customStyle}>
          {RegistrationDates.map((item) => {
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
        ) : null
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
