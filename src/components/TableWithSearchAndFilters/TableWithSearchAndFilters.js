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
//TODO: update default props.
const TableWithSearchAndFilters = ({
  columns,
  current,
  currentFilterStatus,
  currentDataLength,
  data,
  filterPropertiesArray,
  handleOnUserSearch,
  onChangeCurrentPage,
  onChangePageSize,
  optionsIdKey,
  optionsNameKey,
  pageSize,
  searchedValue,
  setCurrentFilterStatus,
  isLoading,
  filterArray,
  setFilterArray,
  onFilterApply,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
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
            {...{
              showFilters,
              setShowFilters,
              filterPropertiesArray,
              filterArray,
              setFilterArray,
              onFilterApply,
            }}
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
    </>
  );
};

TableWithSearchAndFilters.defaultProps = {
  columns: [],
  current: 1,
  currentDataLength: 0,
  currentFilterStatus: [],
  data: [],
  filtersData: [],
  handleOnUserSearch: () => {},
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  optionsIdKey: "",
  optionsNameKey: "",
  pageSize: DEFAULT_PAGE_SIZE,
  searchedValue: "",
  setCurrentFilterStatus: () => {},
  isLoading: false,
  onSearch: ()=>{},
};

TableWithSearchAndFilters.propTypes = {
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  currentFilterStatus: PropTypes.array,
  data: PropTypes.array,
  filtersData: PropTypes.array,
  handleOnUserSearch: PropTypes.func,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  optionsIdKey: PropTypes.string,
  optionsNameKey: PropTypes.string,
  pageSize: PropTypes.number,
  searchedValue: PropTypes.string,
  setCurrentFilterStatus: PropTypes.func,
  isLoading: PropTypes.bool,
  onSearch: PropTypes.func,
};

export default TableWithSearchAndFilters;
