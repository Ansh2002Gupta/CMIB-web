import React from "react";
import PropTypes from "prop-types";
import { TwoRow } from "../../core/layouts";
import TicketListingHeader from "../../containers/TicketListingHeader";
import TicketTable from "../../containers/TicketTable/TicketTable";
import { useIntl } from "react-intl";
import ContentHeader from "../../containers/ContentHeader";
import styles from "./RegisteredCompany.module.scss";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useRegisteredCompany from "./controllers/useRegisteredCompany";

const RegisteredCompany = () => {
  const intl = useIntl();
  const {
    current,
    pageSize,
    registered_companies,
    searchedValue,
    onChangePageSize,
    onChangeCurrentPage,
    columns,
    filterOptions,
    handleOnUserSearch,
  } = useRegisteredCompany();
  return (
    <TwoRow
      topSection={
        <div className={styles.headerBox}>
          <ContentHeader
            headerText={intl.formatMessage({
              id: "label.path.registered-company",
            })}
            isLeftFillSpace
            customStyles={styles.container}
            customContainerStyle={styles.parentContainer}
          />
        </div>
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
              //   onFilterApply,
              placeholder: intl.formatMessage({
                id: "label.search_by_name_or_registration_no",
              }),
              //   filterArray,
              //   setFilterArray,
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
