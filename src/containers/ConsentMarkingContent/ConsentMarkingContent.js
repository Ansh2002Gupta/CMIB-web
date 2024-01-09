import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomGrid from "../../components/CustomGrid";
import CustomTabs from "../../components/CustomTabs";
import { classes } from "./ConsentMarkingContent.styles";
import styles from "./ConsentMarkingContent.module.scss";

const ConsentMarkingContent = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const [activeTab, setActiveTab] = useState("1");

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
      children: <>Round1</>,
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "session.roundTwo" }),
      children: <>Round2</>,
    },
  ];
  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  const handleCancel = () => {};

  const handleSave = () => {};

  return (
    <ThreeRow
      className={styles.mainContainer}
      topSection={
        <CustomGrid customStyle={styles.customStyle}>
          {RegistrationDates.map((item) => {
            return (
              <CustomDateTimePicker
                customLabelStyles={styles.customLabelStyles}
                customContainerStyles={styles.customContainerStyles}
                customTimeStyle={styles.customTimeStyle}
                type="date"
                isRequired={true}
                label={intl.formatMessage({
                  id: `label.consent.${item?.labeIntl}`,
                })}
              />
            );
          })}
        </CustomGrid>
      }
      topSectionStyle={classes.topSectionStyle}
      middleSection={
        <TwoRow
          topSection={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
          bottomSection={activeTabChildren.children}
        />
      }
      bottomSection={
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
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};

export default ConsentMarkingContent;
