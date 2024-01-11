import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Input } from "antd";

import DataTable from "../../../components/DataTable";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { CONFIGURE_CENTRES } from "../../../dummyData";
import styles from "./ConfigureCentreContent.module.scss";

const ConfigureCentreContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(CONFIGURE_CENTRES);
  const [currentDataLength, setCurrentDataLength] = useState(
    CONFIGURE_CENTRES.length
  );
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const goToEditCentrePage = (rowData) => {
    navigate(`/view-centre-details?centreId=${rowData?.centreId}&edit=${true}`);
  };

  const onHandleCentreStatus = (data) => {
    // TODO: do an api call for updating real data into the database.
    const updatedData = currentTableData.map((item) => {
      if (data?.centreId === item.centreId) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setCurrentTableData(updatedData);
  };

  const updateTableData = (currentPageNumber, currentPageSize) =>{
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = CONFIGURE_CENTRES.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  }

  const onChangePageSize = (size) => {
    //NOTE: if you want to do anything on changing of page size please consider doing it here
    setPageSize(Number(size));
    setCurrent(1);
    updateTableData(1, size);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //NOTE: if you want to do anything on changing of current page number please consider doing it here
    setCurrent(newPageNumber);
    updateTableData(newPageNumber, pageSize);
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centreName",
      key: "centreName",
      sortTypeText: true,
      sortKey: "centreName",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreId" }),
      dataIndex: "centreId",
      key: "centreId",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.bigSmallCentre" }),
      dataIndex: "bigSmallCentre",
      key: "bigSmallCentre",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.dateCreated" }),
      dataIndex: "createdOn",
      key: "createdOn",
      renderText: { isTypeDate: true, visible: true },
      sortKey: "createdOn",
      sortTypeDate: true,
      sortDirection: ["ascend"],
      defaultSortOrder: "ascend",
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.status" }),
      dataIndex: "status",
      key: "status",
      renderSwitch: {
        dataKeyName: "centreId",
        switchToggleHandler: (data) => onHandleCentreStatus(data),
        visible: true,
      },
    }),
    renderColumn({
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToEditCentrePage(rowData),
        preview: false,
        src: getImage("edit"),
        visible: true,
      },
    }),
  ];

  useEffect(() => {
    return () => {
      setSearchedValue("");
      setCurrentTableData(CONFIGURE_CENTRES);
      setCurrentDataLength(CONFIGURE_CENTRES.length);
    };
  }, []);

  return (
    <div className={styles.tableContainer}>
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
            id: "label.searchByCentreNameOrId",
          })}
          allowClear
          className={styles.searchBar}
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
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

export default ConfigureCentreContent;
