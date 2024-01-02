import React, { useEffect, useState } from "react";
import { Image, Input } from "antd";

import CustomButton from "../../../components/CustomButton/CustomButton";
import DataTable from "../../../components/DataTable";
import SearchFilter from "../../../components/SearchFilter";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { COMPANY_DATA_SOURCE, COMPANIES_FILTER_DATA } from "../../../dummyData";
import styles from "./CompaniesContent.module.scss";

const CompaniesContent = ({ intl, getImage }) => {
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(COMPANY_DATA_SOURCE);
  const [currentDataLength, setCurrentDataLength] = useState(
    COMPANY_DATA_SOURCE.length
  );

  const goToUserDetailsPage = (data) => {
    navigate(`/company-details?companyId=${data?.id}`);
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
          iconUrl={getImage("arrowDown")}
          iconStyles={styles.btnIconStyles}
          customStyle={styles.greyBtnCustomStyles}
        />
      </div>
      <DataTable
        {...{
          columns,
          searchedValue,
          currentTableData,
          setCurrentTableData,
          currentDataLength,
          setCurrentDataLength,
        }}
        originalData={COMPANY_DATA_SOURCE}
        columnsToBeSearchFrom={["UserName", "email"]}
      />
    </div>
  );
};

export default CompaniesContent;
