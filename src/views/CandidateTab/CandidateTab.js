import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ContentSlider from "../../components/ContentSlider/ContentSlider";
import styles from "./CandidateTab.module.scss";
import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import JobDetails from "../../containers/CompanyDetails/JobDetails";

const CandidateTab = ({ tabList = [] }) => {
  const [activeCandidateTab, setActiveCandidateTab] = useState("1");

  const tabItems = [
    {
      key: "2",
      children: <JobDetails />,
    },
    // Add more tabs if needed
  ];

  useEffect(() => {
    // Set active tab to the first one if tabList is empty
    if (!tabList.length) {
      setActiveCandidateTab(tabItems[0].key);
    }
  }, [tabList, tabItems]);

  const handleSelectTab = (key) => {
    setActiveCandidateTab(key);
    // Perform other necessary actions when tab is selected
  };

  const activeTabChildren = tabItems.find(
    (tab) => tab.key === activeCandidateTab
  );

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        tabList.length > 0 && (
          <ContentSlider
            containerCustomStyle={styles.customStyle}
            tabList={tabList}
          >
            {tabList.map((item, idx) => (
              <div
                key={idx}
                className={
                  activeCandidateTab === String(idx + 1)
                    ? styles.selectedTab
                    : styles.tab
                }
                onClick={() => handleSelectTab(String(idx + 1))}
              >
                <p>{item}</p>
              </div>
            ))}
          </ContentSlider>
        )
      }
      bottomSection={activeTabChildren ? activeTabChildren.children : <></>}
    />
  );
};

CandidateTab.propTypes = {
  tabList: PropTypes.array,
};

export default CandidateTab;