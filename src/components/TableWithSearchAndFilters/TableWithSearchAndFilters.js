import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input, Spin } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import { DEFAULT_PAGE_SIZE } from "../../constant/constant";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import styles from "./TableWithSearchAndFilters.module.scss";

const TableWithSearchAndFilters = ({
  columns,
  current,
  currentDataLength,
  data,
  filterOptions,
  handleOnUserSearch,
  onChangeCurrentPage,
  onChangePageSize,
  pageSize,
  placeholder,
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
          placeholder={
            placeholder ||
            intl.formatMessage({
              id: "label.searchByUserNameAndEmail",
            })
          }
          allowClear
          className={styles.searchBar}
          value={searchedValue?.trim()}
          onChange={(e) => handleOnUserSearch(e.target.value)}
        />
        <SearchFilter
          filterPropertiesArray={filterOptions || ACCESS_FILTER_DATA}
          {...{ showFilters, setShowFilters, onFilterApply }}
        />
      </div>
      {isLoading && (
        <DataTable
          {...{
            columns,
            pageSize,
            current,
            onChangePageSize,
            onChangeCurrentPage,
          }}
          originalData={data || []}
          customContainerStyles={styles.tableContainer}
          {...{ currentDataLength }}
        />
      )}
      {!isLoading && (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

TableWithSearchAndFilters.defaultProps = {
  columns: [],
  current: 1,
  currentDataLength: 0,
  currentFilterStatus: [],
  data: [],
  filterOptions: [],
  handleOnUserSearch: () => {},
  isLoading: false,
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  onFilterApply: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  searchedValue: "",
};

TableWithSearchAndFilters.propTypes = {
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  currentFilterStatus: PropTypes.array,
  data: PropTypes.array,
  filterOptions: PropTypes.array,
  handleOnUserSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  onFilterApply: PropTypes.func,
  pageSize: PropTypes.number,
  placeholder: PropTypes.string,
  searchedValue: PropTypes.string,
};

export default TableWithSearchAndFilters;
