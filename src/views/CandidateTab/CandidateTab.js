import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ContentSlider from "../../components/ContentSlider/ContentSlider";
import styles from "./CandidateTab.module.scss";
import EducationDetails from "../../containers/CandidateDetails/EducationDetails";
import Exams from "../../containers/CandidateDetails/Exams";

const CandidateTab = ({ tabList = [] }) => {
  const [activeCandidateTab, setActiveCandidateTab] = useState("1");

  const tabItems = [
    {
      key: "1",
      children: <EducationDetails />,
    },
    {
      key: "2",
      children: <Exams />,
    },
    {
      key: "3",
      children: <></>,
    },
  ];

  useEffect(() => {
    if (!tabList.length) {
      setActiveCandidateTab(tabItems[0].key);
    }
  }, [tabList, tabItems]);

  const handleSelectTab = (key) => {
    setActiveCandidateTab(key);
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