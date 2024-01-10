import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomTabs from "../../components/CustomTabs";
import ConsentTable from "../ConsentTable";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";
import moment from "moment";

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
      children: <ConsentTable />,
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: <>Round2</>,
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
    navigate(-2);
  };

  const handleSave = () => {};

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
                isRequired={true}
                label={intl.formatMessage({
                  id: `label.consent.${item?.labeIntl}`,
                })}
                placeholder={intl.formatMessage({
                  id: `label.consent.placeholder.${item?.labeIntl}`,
                })}
                value={
                  RegistrationDatesData[item?.labeIntl]
                    ? isEdit
                      ? moment(RegistrationDatesData[item?.labeIntl])
                      : RegistrationDatesData[item?.labeIntl]
                    : null
                }
                onChange={(val) => {
                  handleInputChange(item?.labeIntl, val);
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
        isEdit && (
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
