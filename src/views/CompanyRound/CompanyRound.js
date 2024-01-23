import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import ContentSlider from "../../components/ContentSlider/ContentSlider";
import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import JobDetails from "../../containers/CompanyDetails/JobDetails";
import styles from "./CompanyRound.module.scss";

const CompanyRound = ({ roundList }) => {
  const [activeCompanyTab, setActiveCompanyTab] = useState("1");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabItems = [
    {
      key: "1",
      children: <CompanyProfile />,
    },
    {
      key: "2",
      children: <JobDetails />,
    },
  ];

  const handleSelectTab = (idx) => {
    setActiveCompanyTab();
    setSearchParams((params) => {
      params.set("company-tab", idx);
      return params;
    });
  };

  useEffect(() => {
    const tabQueryParam = searchParams.get("company-tab");
    if (tabItems.some((tab) => tab.key === tabQueryParam)) {
      setActiveCompanyTab(tabQueryParam);
    } else {
      setActiveCompanyTab(tabItems[0].key);
      setSearchParams((params) => {
        params.set("company-tab", tabItems[0].key);
        return params;
      });
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
