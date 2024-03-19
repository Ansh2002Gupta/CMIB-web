import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useRegisteredCompany from "./controllers/useRegisteredCompany";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./RegisteredCompany.module.scss";

const RegisteredCompany = () => {
  const intl = useIntl();
  const {
    current,
    pageSize,
    registered_companies,
    searchedValue,
    onChangePageSize,
    onChangeCurrentPage,
    onFilterApply,
    columns,
    filterOptions,
    isLoading,
    isError,
    filterArray,
    setFilterArray,
    handleOnUserSearch,
    getErrorDetails,
  } = useRegisteredCompany();
  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText={intl.formatMessage({
            id: "label.path.registered-company",
          })}
          isLeftFillSpace
          customContainerStyle={commonStyles.headerBox}
        />
      }
      isBottomFillSpace
      bottomSection={
        <>
          {!isError && (
            <TableWithSearchAndFilters
              {...{
                current,
                pageSize,
                searchedValue,
                filterOptions,
                handleOnUserSearch,
                columns,
                onChangePageSize,
                onChangeCurrentPage,
                onFilterApply,
                placeholder: intl.formatMessage({
                  id: "label.search_by_name_or_registration_no",
                }),
                filterArray,
                setFilterArray,
              }}
              isLoading={isLoading}
              data={registered_companies?.records}
              currentDataLength={registered_companies?.meta?.total}
            />
          )}
          {isError && !isLoading && (
            <div className={styles.errorMessageContainer}>
              <ErrorMessageBox
                errorHeading={intl.formatMessage({ id: "label.error" })}
                errorText={getErrorDetails()?.errorMessage}
                onRetry={() => getErrorDetails()?.onRetry()}
              />
            </div>
          )}
        </>
      }
    />
  );
};

export default RegisteredCompany;
