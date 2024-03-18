import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import CompanyDetailsApprovalCard from "../../components/CompanyDetailsApprovalCard/CompanyDetailsApprovalCard";
import ContentHeader from "../../containers/ContentHeader";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { getRegisteredCompanyDetailsColumns } from "./RegisteredCompanyDetailsConfig";
import { modules } from "../../containers/SideMenu/sideMenuItems";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, REGISTERED_COMPANIES } from "../../constant/apiEndpoints";
import styles from "./RegisteredCompaniesDetails.module.scss";
import commonStyles from "../../common/commonStyles.module.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const RegisteredCompaniesDetails = () => {
  const intl = useIntl();
  // let { id } = useParams();
  const id = 16;

  const {
    data: companyDetails,
    fetchData: fetchCompanyDetails,
    error: errorCompanyDetails,
    isError: isErrorCompanyDetails,
    isLoading: isFetchingCompanyDetails,
  } = useFetch({
    url: `${ADMIN_ROUTE}${REGISTERED_COMPANIES}/${id}/details`,
  });

  const getStructredData = (unstructuredData) => {
    return unstructuredData.map((data) => {
      const currentModule = modules.find((module) => {
        if (data.name === module.key) {
          return module?.label;
        }
      });
      return {
        ...data,
        name: currentModule?.label,
      };
    });
  };

  const unstructuredData = companyDetails?.company_module_access || [];
  const companyAccessibleModule = getStructredData(unstructuredData);

  console.log("companyAccessibleModule", companyAccessibleModule);

  const { renderColumn } = useRenderColumn();
  // const [dataSource, setDataSource] = useState(
  //   apiData.map((data) => {
  //     const currentModule = modules.find((module) => {
  //       if (data.name === module.key) {
  //         return module?.label;
  //       }
  //     });
  //     return {
  //       id: data?.id,
  //       name: currentModule?.label,
  //       is_approved: data?.is_approved,
  //     };
  //   })
  // );

  const handleSwitchButton = (data) => {
    // const updatedDetails = [...dataSource];
    // updatedDetails[data.id - 1] = {
    //   ...updatedDetails[data.id - 1],
    //   is_approved: 1,
    // };
    // setDataSource(updatedDetails);
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
      isBottomFillSpace
      bottomSection={
        <>
          {isFetchingCompanyDetails && <CustomLoader />}
          {!isFetchingCompanyDetails && !isErrorCompanyDetails && (
            <TwoRow
              className={styles.container}
              topSection={
                <CompanyDetailsApprovalCard
                  {...{
                    columns,
                    customTableStyle: styles.tableContainer,
                    dataSource: companyAccessibleModule,
                    heading: intl.formatMessage({ id: "label.approval" }),
                  }}
                />
              }
              bottomSection={
                <CompanyProfile companyProfileDetails={companyDetails} />
              }
            />
          )}
        </>
      }
    />
  );
};

export default RegisteredCompaniesDetails;
