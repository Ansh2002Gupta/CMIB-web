import React, { useState } from "react";
import PropTypes from "prop-types";

import { TwoRow } from "../../core/layouts";

import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import ContentSlider from "../../containers/ContentSlider";
import JobDetails from "../../containers/CompanyDetails/JobDetails";
import styles from "./CompanyRound.module.scss";

const CompanyRound = ({ roundList }) => {
  const [activeCompanyTab, setActiveCompanyTab] = useState(1);

  const tabItems = [
    {
      key: 1,
      children: <CompanyProfile />,
    },
    {
      key: 2,
      children: <JobDetails />,
    },
  ];

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
                  activeCompanyTab === idx + 1 ? styles.selectedTab : styles.tab
                }
                onClick={() => setActiveCompanyTab(idx + 1)}
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
