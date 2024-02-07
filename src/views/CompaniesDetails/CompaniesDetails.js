import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "core/layouts";

import CompanyHeader from "../../containers/CompanyDetails/CompanyHeader";
import CompanyRound from "../CompanyRound";
import CustomTabs from "../../components/CustomTabs";
import { COMPANY_ROUND_ONE, COMPANY_ROUND_TWO } from "../../constant/constant";
import variables from "../../themes/base/styles/variables";
import styles from "./CompaniesDetails.module.scss";

function CompaniesDetails() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState("1");

  const tabItems = [
    {
      key: "1",
      title: intl.formatMessage({ id: "label.roundOne" }),
      children: <CompanyRound roundList={COMPANY_ROUND_ONE} />,
    },
    {
      key: "2",
      title: intl.formatMessage({ id: "label.roundTwo" }),
      children: <CompanyRound roundList={COMPANY_ROUND_TWO} />,
    },
  ];

  const activeTabChildren = tabItems.find((tab) => tab.key === activeTab);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.topSectionStyle}
          topSection={<CompanyHeader />}
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

export default CompaniesDetails;
