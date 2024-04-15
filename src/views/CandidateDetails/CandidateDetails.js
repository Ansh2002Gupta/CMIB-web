import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";

import CustomTabs from "../../components/CustomTabs";
import { CANDIDATES_EDUCATION_DETAILS } from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import styles from "./CandidateDetails.module.scss";
import CandidateHeader from "../../containers/CandidateDetails/CandidateHeader/CandidateHeader";
import CandidateTab from "../CandidateTab";
import CandidateProfile from "../../containers/CandidateDetails/CandidateProfile";

function CandidateDetails() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState("1");

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "label.menu.personalDetails" }),
      children: <CandidateProfile/>,
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "label.menu.educationDetails" }),
      children: <CandidateTab tabList={CANDIDATES_EDUCATION_DETAILS} />,
    },
    {
      key: "3",
      title: intl.formatMessage({ id: "label.menu.membershipsDetails" }),
      children: <></>,
    },
    {
      key: "4",
      title: intl.formatMessage({ id: "label.menu.workExperience" }),
      children: <></>,
    },
    {
      key: "5",
      title: intl.formatMessage({ id: "label.menu.skillTraining" }),
      children: <></>,
    },
    {
      key: "6",
      title: intl.formatMessage({ id: "label.menu.activities" }),
      children: <></>,
    },
    {
      key: "7",
      title: intl.formatMessage({ id: "label.menu.jobPreference" }),
      children: <></>,
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={<CandidateHeader />}
          bottomSection={
            <CustomTabs
              tabs={tabItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        />
      }
      bottomSection={!!activeTabChildren && activeTabChildren.children}
      bottomSectionStyle={{
        padding: variables.fontSizeXlargeMedium,
        width: "100%",
      }}
    />
  );
}

export default CandidateDetails;
