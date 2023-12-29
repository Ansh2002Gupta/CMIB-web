import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Input } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import DataTable from "../../components/DataTable";
import CustomButton from "../../components/CustomButton/CustomButton";
import SearchFilter from "../../components/SearchFilter";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { COMPANY_DATA_SOURCE, COMPANIES_FILTER_DATA } from "../../dummyData";
import styles from "./Companies.module.scss";

const Companies = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [showFilters, setShowFilters] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(COMPANY_DATA_SOURCE);
  const [currentDataLength, setCurrentDataLength] = useState(
    COMPANY_DATA_SOURCE.length
  );

  const { renderColumn } = useRenderColumn();

  const goToUserDetailsPage = (data) => {
    navigate(`/company-details?companyId=${data?.companyId}`);
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
        items: [{ key: 1, label: intl.formatMessage({ id: "label.manageCompanyDetails" }) }],
        onMenuClick: (rowData) => goToUserDetailsPage(rowData),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    })
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
    <TwoRow
      isBottomFillSpace
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader
            headerText={intl.formatMessage({ id: "label.companies" })}
            customStyles={styles.headerResponsiveStyle}
            rightSection={
              <CustomButton
                btnText={intl.formatMessage({ id: "label.addCompany" })}
                iconUrl={getImage("plusIcon")}
                iconStyles={styles.btnIconStyles}
                customStyle={styles.btnCustomStyles}
              />
            }
          />
        </div>
      }
      className={styles.baseLayout}
      bottomSection={
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
                  id: "label.searchByComapnyName",
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
      }
    />
  );
};

export default Companies;
