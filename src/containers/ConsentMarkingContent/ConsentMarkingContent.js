import React, { useState, useMemo } from "react";
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
import {
  CONSENT_MARKING_REGESTRATION_DETAILS,
  LAST_MARKING_REGESTRATION_DETAILS,
} from "../../dummyData";
import { SESSION } from "../../routes/routeNames";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = ({ isEdit }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [activeTab, setActiveTab] = useState("1");
  const [RegistrationDatesData, setRegistrationDatesData] = useState({
    startDateCompanies: "2023-12-19T05:11:46.000000Z",
    startDateCandidates: "2023-12-19T05:11:46.000000Z",
    lastDateBigCentres: "2023-12-19T05:11:46.000000Z",
    lastDateSmallCentres: "2023-12-19T05:11:46.000000Z",
  });
  const initialData = useMemo(() => {
    return CONSENT_MARKING_REGESTRATION_DETAILS.map((item) => ({
      ...item,
      sNo: item.sNo,
      centreName: item.centreName,
      companyStartDate: item.companyStartDate
        ? dayjs(item.companyStartDate)
        : null,
      companyEndDate: item.companyEndDate ? dayjs(item.companyEndDate) : null,
      consentFromDate: item.consentFromDate
        ? dayjs(item.consentFromDate)
        : null,
      consentToDate: item.consentToDate ? dayjs(item.consentToDate) : null,
    }));
  }, [CONSENT_MARKING_REGESTRATION_DETAILS]);

  const registrationInitialData = useMemo(() => {
    return LAST_MARKING_REGESTRATION_DETAILS.map((item) => ({
      ...item,
      sNo: item.sNo,
      centreName: item.centreName,
      lastRegistrationDate: item.lastRegistrationDate
        ? dayjs(item.lastRegistrationDate)
        : null,
      psychometricTestDate: item.psychometricTestDate
        ? dayjs(item.psychometricTestDate)
        : null,
    }));
  }, [LAST_MARKING_REGESTRATION_DETAILS]);

  const [tableData, setTableData] = useState(initialData);
  const [registrationTableData, setRegistrationTableData] = useState(
    registrationInitialData
  );

  const RegistrationDates = [
    { id: 1, labeIntl: "startDateCompanies" },
    { id: 2, labeIntl: "startDateCandidates" },
    { id: 3, labeIntl: "lastDateBigCentres" },
    { id: 4, labeIntl: "lastDateSmallCentres" },
  ];

  const tabItems = useMemo(
    () => [
      {
        key: "1",
        title: intl.formatMessage({ id: "session.roundOne" }),
        children: (
          <ConsentTable
            {...{ isEdit, tableData, setTableData }}
            originalData={CONSENT_MARKING_REGESTRATION_DETAILS}
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
            {...{ isEdit, registration: true, tableData, setTableData }}
            tableData={registrationTableData}
            setTableData={setRegistrationTableData}
            originalData={LAST_MARKING_REGESTRATION_DETAILS}
          />
        ),
      },
    ],
    [
      intl,
      isEdit,
      tableData,
      setTableData,
      registrationTableData,
      setRegistrationTableData,
    ]
  );
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
                  RegistrationDatesData[item?.labeIntl]
                    ? isEdit
                      ? dayjs(RegistrationDatesData[item?.labeIntl])
                      : RegistrationDatesData[item?.labeIntl]
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
              setActiveTab={setActiveTab}
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
