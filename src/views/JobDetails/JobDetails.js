import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ContentSlider from "../../components/ContentSlider/ContentSlider";
import JobDetails from "../../containers/AllJobDetails/JobDetails";
import Questionnaire from "../../containers/AllJobDetails/Questionnaire";
import { urlService } from "../../Utils/urlService";
import styles from "./JobDetails.module.scss";

const CompanyRound = ({ roundList, jobDetails }) => {
  const [activeCompanyTab, setActiveCompanyTab] = useState("1");

  const tabItems = [
    {
      key: "1",
      children: <JobDetails jobDetails={jobDetails} />,
    },
    {
      key: "2",
      children: <Questionnaire />,
    },
  ];

  const handleSelectTab = (idx) => {
    setActiveCompanyTab();
    urlService.setQueryStringValue("company-tab", idx);
  };

  useEffect(() => {
    const tabQueryParam = urlService.getQueryStringValue("company-tab");
    if (tabItems.some((tab) => tab.key === tabQueryParam)) {
      setActiveCompanyTab(tabQueryParam);
    } else {
      setActiveCompanyTab(tabItems[0].key);
      urlService.setQueryStringValue("company-tab", tabItems[0].key);
    }
  }, [activeCompanyTab]);

  const activeTabChildren = tabItems.find(
    (tab) => tab.key === activeCompanyTab
  );

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <ContentSlider
          containerCustomStyle={styles.customStyle}
          roundList={roundList}
        >
          {roundList.map((i, idx) => {
            return (
              <div
                key={idx}
                className={
                  activeCompanyTab === String(idx + 1)
                    ? styles.selectedTab
                    : styles.tab
                }
                onClick={() => handleSelectTab(String(idx + 1))}
              >
                <p>{i}</p>
              </div>
            );
          })}
        </ContentSlider>
      }
      bottomSection={!!activeTabChildren ? activeTabChildren.children : <></>}
    />
  );
};

CompanyRound.defaultProps = {
  roundList: [],
};

CompanyRound.propTypes = {
  roundList: PropTypes.array,
};

export default CompanyRound;
