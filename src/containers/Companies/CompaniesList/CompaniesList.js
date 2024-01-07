import React, { useEffect, useState, useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Input } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../../components/CustomButton/CustomButton";
import DataTable from "../../../components/DataTable";
import SearchFilter from "../../../components/SearchFilter";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { ReactComponent as ArrowDown } from "../../../themes/base/assets/images/arrow-down.svg";
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
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  // TODO: below code inside useEffect is only for dummy data, will remove it once API is integrated
  useEffect(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;
    const updatedData = COMPANY_DATA_SOURCE.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  }, [current, pageSize]);

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
          setCurrent,
          pageSize,
          setPageSize,
        }}
        originalData={currentTableData}
        columnsToBeSearchFrom={["companyName"]}
      />
    </div>
  );
};

export default CompaniesContent;
