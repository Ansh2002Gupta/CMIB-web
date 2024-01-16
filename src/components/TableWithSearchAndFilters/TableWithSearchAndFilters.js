import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Image, Input } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchFilter from "../../components/SearchFilter";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import { DEFAULT_PAGE_SIZE } from "../../constant/constant";
import styles from "./TableWithSearchAndFilters.module.scss";

const TableWithSearchAndFilters = ({
  columns,
  current,
  currentDataLength,
  data,
  handleOnUserSearch,
  onChangeCurrentPage,
  onChangePageSize,
  pageSize,
  searchedValue,
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
            filterPropertiesArray={ACCESS_FILTER_DATA}
            {...{ showFilters, setShowFilters }}
          />
        </div>
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
      </div>
    </>
  );
};

TableWithSearchAndFilters.defaultProps = {
  columns: [],
  current: 1,
  currentDataLength: 0,
  data: [],
  handleOnUserSearch: () => {},
  onChangeCurrentPage: () => {},
  onChangePageSize: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  searchedValue: "",
};

TableWithSearchAndFilters.propTypes = {
  columns: PropTypes.array,
  current: PropTypes.number,
  currentDataLength: PropTypes.number,
  data: PropTypes.array,
  handleOnUserSearch: PropTypes.func,
  onChangeCurrentPage: PropTypes.func,
  onChangePageSize: PropTypes.func,
  pageSize: PropTypes.number,
  searchedValue: PropTypes.string,
};

export default TableWithSearchAndFilters;
