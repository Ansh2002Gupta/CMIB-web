import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useRegisteredCompany from "./controllers/useRegisteredCompany";
import commonStyles from "../../common/commonStyles.module.scss";

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
    filterArray,
    setFilterArray,
    handleOnUserSearch,
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
      bottomSection={
        <>
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
            isLoading={false}
            data={registered_companies?.records}
            currentDataLength={registered_companies?.meta?.total}
          />
        </>
      }
    />
  );
};

export default RegisteredCompany;
