import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CompanyProfile from "../../containers/CompanyDetails/CompanyProfile";
import CompanyDetailsApprovalCard from "../../containers/CompanyDetailsApprovalCard/CompanyDetailsApprovalCard";
import ContentHeader from "../../containers/ContentHeader";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import { getRegisteredCompanyDetailsColumns } from "./RegisteredCompanyDetailsConfig";
import useFetch from "../../core/hooks/useFetch";
import { usePatch } from "../../core/hooks/useApiRequest";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../core/hooks/useShowNotification";
import {
  ADMIN_ROUTE,
  APPROVE,
  REGISTERED_COMPANIES,
} from "../../constant/apiEndpoints";
import { getErrorMessage } from "../../constant/utils";
import { modules } from "../../containers/SideMenu/sideMenuItems";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./RegisteredCompaniesDetails.module.scss";

const RegisteredCompaniesDetails = () => {
  const intl = useIntl();
  let { id } = useParams();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [companyAccessibleModule, setCompanyAccessibleModule] = useState([]);

  const {
    data: companyDetails,
    fetchData: fetchCompanyDetails,
    error: errorCompanyDetails,
    isError: isErrorCompanyDetails,
    isLoading: isFetchingCompanyDetails,
  } = useFetch({
    url: `${ADMIN_ROUTE}${REGISTERED_COMPANIES}/${id}`,
  });

  useEffect(() => {
    if (companyDetails && companyDetails.company_module_access) {
      const structuredData = getStructuredData(
        companyDetails.company_module_access
      );
      setCompanyAccessibleModule(structuredData);
    }
  }, [companyDetails]);

  const getStructuredData = (unstructuredData) => {
    return unstructuredData.map((data) => {
      const currentModule = modules.find((module) => {
        if (data.name === module.key) {
          return module?.label;
        }
      });
      return {
        ...data,
        label: currentModule?.label,
      };
    });
  };
  const { renderColumn } = useRenderColumn();

  const { makeRequest: updateApprovalStatus } = usePatch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES + `/${id}` + APPROVE,
  });

  const handleSwitchButton = (moduleData) => {
    const { id } = moduleData;
    const payload = {
      module_id: id,
      is_approved: 1,
    };
    updateApprovalStatus({
      body: payload,
      onSuccessCallback: () => {
        const updatedAccessibleModule = companyAccessibleModule.map(
          (module) => {
            if (module.id === id) {
              return { ...module, is_approved: 1 };
            }
            return module;
          }
        );
        setCompanyAccessibleModule(updatedAccessibleModule);
      },
      onErrorCallback: (errorMsg) => {
        showNotification({
          text: errorMsg?.data?.message,
          type: "error",
        });
      },
    });
  };

  const columns = getRegisteredCompanyDetailsColumns({
    handleSwitchButton,
    intl,
    renderColumn,
  });

  return (
    <>
      {notificationContextHolder}
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
            {!isFetchingCompanyDetails && isErrorCompanyDetails && (
              <div className={styles.errorMessageContainer}>
                <ErrorMessageBox
                  errorHeading={intl.formatMessage({ id: "label.error" })}
                  errorText={getErrorMessage(errorCompanyDetails)}
                  onRetry={() => fetchCompanyDetails({})}
                />
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default RegisteredCompaniesDetails;
