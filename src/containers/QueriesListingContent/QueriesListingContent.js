import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Image, Input, Spin } from "antd";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import SearchFilter from "../../components/SearchFilter";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useQueriesListingApi from "../../services/api-services/Queries/useQueriesListingApi";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { ACCESS_FILTER_DATA } from "../../dummyData";
import {
  PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import styles from "./QueriesListingContent.module.scss";

const QueriesListingContent = ({ currentActiveTab }) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [current, setCurrent] = useState(
    +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE) || 1
  );
  const [pageSize, setPageSize] = useState(
    +searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE) || PAGE_SIZE
  );

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentDataLength, setCurrentDataLength] = useState(0);

  const {
    isSuccess: areQueriesFetchedSuccessfully,
    isFetchingQueries,
    errorWhileFetchingQueries,
    queriesList,
    fetchQueries,
    metaData,
  } = useQueriesListingApi();

  const debounceSearch = useMemo(() => _.debounce(fetchQueries, 300), []);
  let doNotCallOnMount = useRef(false);

  useEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(current)) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
      setCurrent(1);
    }
    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], PAGE_SIZE);
        return prev;
      });
      setPageSize(PAGE_SIZE);
    }
  }, []);

  useEffect(() => {
    if (metaData?.total) {
      setCurrentDataLength(+metaData?.total);
    }
  }, [metaData]);

  const goToUserDetailsPage = (userId, mode) => {
    navigate(`details/${userId}?mode=${mode ? "edit" : "view"}`);
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.queriesId" }),
      dataIndex: "id",
      key: "id",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.studentOrCompany" }),
      dataIndex: "name",
      key: "name",
      sortKey: "name",
      sortTypeText: true,
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.nonRegisteredStudentOrCompany" }),
      dataIndex: "type",
      key: "type",
      renderText: { isTextBold: true, visible: true },
    }),
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.mobile" })}
        </p>
      ),
      dataIndex: "mobile",
      key: "mobile",
      renderText: { isTextBold: true, visible: true },
    },
    renderColumn({
      title: intl.formatMessage({ id: "label.queryType" }),
      dataIndex: "query_type",
      key: "query_type",
      renderText: { isTypeDate: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.email" }),
      dataIndex: "email",
      key: "email",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.createdOn" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
      sortDirection: ["ascend"],
      sortKey: "created_at",
      sortTypeDate: true,
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      dataIndex: "see",
      key: "see",
      renderImage: {
        alt: "eye",
        onClick: (rowData) => goToUserDetailsPage(rowData?.id, false),
        preview: false,
        src: getImage("eye"),
        visible: true,
      },
    }),
    renderColumn({
      dataIndex: "check",
      key: "check",
      renderImage: {
        alt: "check",
        onClick: (rowData) => goToUserDetailsPage(rowData?.id, true),
        preview: false,
        src: getImage("rightIcon"),
        visible: true,
      },
    }),
  ];

  useEffect(() => {
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentDataLength(0);
    };
  }, []);

  useEffect(() => {
    if (doNotCallOnMount.current) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], current);
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], pageSize);
        return prev;
      });
      fetchQueries(pageSize, current, searchedValue);
    }
    doNotCallOnMount.current = true;
  }, [pageSize, current]);

  useEffect(() => {
    debounceSearch(pageSize, current, searchedValue);
  }, [searchedValue]);

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
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          <SearchFilter
            filterPropertiesArray={ACCESS_FILTER_DATA}
            {...{ showFilters, setShowFilters }}
          />
        </div>
        {areQueriesFetchedSuccessfully && (
          <DataTable
            {...{
              columns,
              searchedValue,
              currentDataLength,
              setCurrentDataLength,
              pageSize,
              current,
              setCurrent,
              setPageSize,
            }}
            originalData={currentActiveTab === 2 ? queriesList : []}
          />
        )}
        {isFetchingQueries && !errorWhileFetchingQueries && (
          <div className={styles.loaderContainer}>
            <Spin size="large" />
          </div>
        )}
        {errorWhileFetchingQueries && (
          <div className={styles.errorContainer}>
            <ErrorMessageBox
              onClick={() => fetchQueries(10, 1)}
              errorText={errorWhileFetchingQueries}
              errorHeading={intl.formatMessage({
                id: "label.error",
              })}
            />
          </div>
        )}
      </div>
    </>
  );
};

QueriesListingContent.defaultProps = {
  currentActiveTab: 1,
};

QueriesListingContent.propTypes = {
  currentActiveTab: PropTypes.number,
};

export default QueriesListingContent;
