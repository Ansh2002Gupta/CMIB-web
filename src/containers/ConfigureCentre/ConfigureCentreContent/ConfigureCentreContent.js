import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Input, Spin } from "antd";

import DataTable from "../../../components/DataTable";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useFetch from "../../../core/hooks/useFetch";
import useRenderColumn from "../../../core/hooks/useRenderColumn/useRenderColumn";
import { CONFIGURE_CENTRES } from "../../../dummyData";
import {
  CENTER_LISTING_END_POINT,
  PLACEMENT_ROUTE,
} from "../../../constant/apiEndpoints";
import styles from "./ConfigureCentreContent.module.scss";

const ConfigureCentreContent = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(CONFIGURE_CENTRES);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: PLACEMENT_ROUTE + CENTER_LISTING_END_POINT,
  });
  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const goToEditCentrePage = (rowData) => {
    navigate(
      `/view-centre-details?centreId=${rowData?.centreId}&mode=${
        true ? "edit" : "view"
      }`
    );
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

  const onChangePageSize = (size) => {
    //NOTE: if you want to do anything on changing of page size please consider doing it here
    setPageSize(Number(size));
    setCurrent(1);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //NOTE: if you want to do anything on changing of current page number please consider doing it here
    setCurrent(newPageNumber);
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "center_name",
      key: "center_name",
      sortTypeText: true,
      sortKey: "center_name",
      renderText: { isTextBold: true, visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreId" }),
      dataIndex: "center_code",
      key: "center_code",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.bigSmallCentre" }),
      dataIndex: "center_type",
      key: "center_type",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.dateCreated" }),
      dataIndex: "created_at",
      key: "created_at",
      renderText: { isTypeDate: true, visible: true },
      sortKey: "created_at",
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
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.box}>
          <Spin size="large" />
        </div>
      )}
      {isError && (
        <div className={styles.box}>
          <ErrorMessageBox
            onClick={fetchData}
            errorText={errorString}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {isSuccess && (
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
              current,
              pageSize,
              onChangePageSize,
              onChangeCurrentPage,
            }}
            currentDataLength={data?.length}
            originalData={data?.records}
          />
        </div>
      )}
    </>
  );
};

export default ConfigureCentreContent;
