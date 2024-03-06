import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useIntl } from "react-intl";
import { Image, Input } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../../components/CustomButton/CustomButton";
import DataTable from "../../../components/DataTable";
import SearchFilter from "../../../components/SearchFilter";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { getValidPageNumber, getValidPageSize } from "../../../constant/utils";
import { urlService } from "../../../Utils/urlService";
import { ReactComponent as ArrowDown } from "../../../themes/base/assets/images/arrow-down.svg";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../../constant/constant";
import { COMPANY_DATA_SOURCE, COMPANIES_FILTER_DATA } from "../../../dummyData";
import styles from "./CompaniesList.module.scss";

const CompaniesContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();

  const { getImage } = useContext(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(COMPANY_DATA_SOURCE);
  const [currentDataLength, setCurrentDataLength] = useState(
    COMPANY_DATA_SOURCE.length
  );
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
  );

  const goToUserDetailsPage = (data) => {
    const companyId = data?.id;
    navigate(`company-details/${companyId}`);
  };

  const onHandleCompanyStatus = (data) => {
    // TODO: do an api call for updating real data into the database.
    const updatedData = currentTableData.map((item) => {
      if (data?.id === item.id) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setCurrentTableData(updatedData);
  };

  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = COMPANY_DATA_SOURCE.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  };

  const onChangePageSize = (size) => {
    //NOTE: if you want to do anything on changing of page size please consider doing it here
    setPageSize(Number(size));
    setCurrent(1);
    updateTableData(1, size);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //NOTE: if you want to do anything on changing of current page number please consider doing it here
    setCurrent(newPageNumber);
    updateTableData(newPageNumber, pageSize);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.companyName" }),
      dataIndex: "companyName",
      key: "companyName",
      sortTypeText: true,
      sortKey: "companyName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.entity" }),
      dataIndex: "entity",
      key: "entity",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.city" }),
      dataIndex: "city",
      key: "city",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.phoneNumber" }),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        dataKeyName: "centreId",
        switchToggleHandler: (data) => onHandleCompanyStatus(data),
        visible: true,
      },
    }),
    renderColumn({
      dataIndex: "more",
      key: "more",
      renderMenu: {
        items: [
          {
            key: 1,
            label: intl.formatMessage({ id: "label.manageCompanyDetails" }),
          },
        ],
        onMenuClick: (rowData) => goToUserDetailsPage(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];

  useLayoutEffect(() => {
    const currentPage = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const currentPagePerRow = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.ROW_PER_PAGE,
        DEFAULT_PAGE_SIZE
      );
    }
  }, []);

  useEffect(() => {
    if (COMPANY_DATA_SOURCE.length >= 0) {
      setCurrentDataLength(+COMPANY_DATA_SOURCE.length);
    }
    const totalNumberOfValidPages = Math.ceil(
      COMPANY_DATA_SOURCE.length / pageSize
    );
    if (current > totalNumberOfValidPages) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
      setCurrent(1);
    }
  }, [currentTableData, current, pageSize]);

  useEffect(() => {
    return () => {
      setShowFilters(false);
      setSearchedValue("");
      setCurrentTableData(COMPANY_DATA_SOURCE);
      setCurrentDataLength(COMPANY_DATA_SOURCE.length);
    };
  }, []);

  return (
    <div className={styles.filterAndTableContainer}>
      <div className={styles.filterAndButtonContainer}>
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
              id: "label.searchByComapanyName",
            })}
            allowClear
            className={styles.searchBar}
            value={searchedValue}
            onChange={(e) => setSearchedValue(e.target.value)}
          />
          <SearchFilter
            filterPropertiesArray={COMPANIES_FILTER_DATA}
            {...{ showFilters, setShowFilters }}
          />
        </div>
        <CustomButton
          btnText={intl.formatMessage({ id: "label.generatePaymentMis" })}
          IconElement={ArrowDown}
          iconStyles={styles.btnIconStyles}
          customStyle={styles.greyBtnCustomStyles}
        />
      </div>
      <DataTable
        {...{
          columns,
          searchedValue,
          currentDataLength,
          current,
          pageSize,
          onChangePageSize,
          onChangeCurrentPage,
        }}
        originalData={currentTableData}
      />
    </div>
  );
};

export default CompaniesContent;
