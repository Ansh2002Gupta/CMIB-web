import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input, Spin } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import { DEFAULT_PAGE_SIZE } from "../../constant/constant";
import styles from "./TableWithSearchAndFilters.module.scss";

const TableWithSearchAndFilters = ({
  arrayContainingSelectedRow,
  columns,
  current,
  currentDataLength,
  data,
  filterPropertiesArray,
  filterOptions,
  handleOnUserSearch,
  onChangeCurrentPage,
  onChangePageSize,
  pageSize,
  searchedValue,
  isLoading,
  onFilterApply,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={styles.filterAndTableContainer}>
      <div className={styles.searchBarContainer}>
        <Input
          prefix={
            <Image
              src={getImage("searchIcon")}
              className={styles.searchIcon}
              preview={false}
            />
          }
          placeholder={intl.formatMessage({
            id: "label.searchByUserNameAndEmail",
          })}
          allowClear
          className={styles.searchBar}
          value={searchedValue}
          onChange={(e) => handleOnUserSearch(e.target.value)}
        />

        <SearchFilter
          filterPropertiesArray={filterOptions || ACCESS_FILTER_DATA}
          {...{ showFilters, setShowFilters, onFilterApply }}
        />
        <SearchFilter
          {...{
            showFilters,
            setShowFilters,
            filterPropertiesArray: filterOptions || filterPropertiesArray,
            filterArray,
            setFilterArray,
            onFilterApply,
          }}
        />
      </div>
      {isLoading ? (
        <DataTable
          columns={columns}
          pageSize={pageSize}
          current={current}
          onChangePageSize={onChangePageSize}
          onChangeCurrentPage={onChangeCurrentPage}
          arrayContainingSelectedRow={arrayContainingSelectedRow}
          originalData={data || []}
          customContainerStyles={styles.tableContainer}
          currentDataLength={currentDataLength}
        />
      ) : (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

TableWithSearchAndFilters.defaultProps = {
  arrayContainingSelectedRow: [],
  columns: [],
  current: 1,
  currentDataLength: 0,
  data: [],
  handleOnUserSearch: () => {},
  isLoading: false,
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  onFilterApply: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  searchedValue: "",
};

TableWithSearchAndFilters.propTypes = {
  arrayContainingSelectedRow: PropTypes.array,
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  data: PropTypes.array,
  handleOnUserSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  onFilterApply: PropTypes.func,
  pageSize: PropTypes.number,
  searchedValue: PropTypes.string,
};

export default TableWithSearchAndFilters;
