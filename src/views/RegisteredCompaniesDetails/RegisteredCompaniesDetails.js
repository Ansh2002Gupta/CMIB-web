import React, { useState } from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import CompanyDetailsApprovalCard from "../../components/CompanyDetailsApprovalCard/CompanyDetailsApprovalCard";
import ContentHeader from "../../containers/ContentHeader";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { getRegisteredCompanyDetailsColumns } from "./RegisteredCompanyDetailsConfig";
import { modules } from "../../containers/SideMenu/sideMenuItems";
import styles from "./RegisteredCompaniesDetails.module.scss";
import commonStyles from "../../common/commonStyles.module.scss";

const apiData = [
  {
    key: "1",
    module: "ca-jobs",
    approved_not_approved: "approved",
  },
  {
    key: "2",
    module: "nqca-placements",
    approved_not_approved: "unapproved",
  },
  {
    key: "3",
    module: "control",
    approved_not_approved: "approved",
  },
  {
    key: "4",
    module: "career-ascents",
    approved_not_approved: "unapproved",
  },
];

const RegisteredCompaniesDetails = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const [dataSource, setDataSource] = useState(
    apiData.map((data) => {
      const currentModule = modules.find((module) => {
        if (data.module === module.key) {
          return module?.label;
        }
      });
      return {
        key: data.key,
        module: currentModule?.label,
        approved_not_approved: data.approved_not_approved,
      };
    })
  );

  const handleSwitchButton = (data) => {
    const updatedDetails = [...dataSource];
    updatedDetails[data.key - 1] = {
      ...updatedDetails[data.key - 1],
      approved_not_approved: "approved",
    };
    setDataSource(updatedDetails);
  };

  const columns = getRegisteredCompanyDetailsColumns({
    handleSwitchButton,
    intl,
    renderColumn,
  });

  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText={intl.formatMessage({
            id: "label.path.registered-company-details",
          })}
          isLeftFillSpace
          customContainerStyle={commonStyles.headerBox}
        />
      }
      bottomSection={
        <TwoRow
          className={styles.container}
          topSection={
            <CompanyDetailsApprovalCard
              {...{
                columns,
                customTableStyle: styles.tableContainer,
                dataSource,
                heading: intl.formatMessage({ id: "label.companyDetails" }),
              }}
            />
          }
          bottomSection={<CompanyProfile />}
        />
      }
    />
  );
};

export default RegisteredCompaniesDetails;
