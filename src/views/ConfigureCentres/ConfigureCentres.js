import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Input } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import DataTable from "../../components/DataTable";
import CustomButton from "../../components/CustomButton/CustomButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useResponsive from "../../core/hooks/useResponsive";
import { CONFIGURE_CENTRES } from "../../dummyData";

import styles from "./ConfigureCentres.module.scss";

const ConfigureCentres = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [searchedValue, setSearchedValue] = useState("");
  const [currentTableData, setCurrentTableData] = useState(CONFIGURE_CENTRES);
  const [currentDataLength, setCurrentDataLength] = useState(
    CONFIGURE_CENTRES.length
  );

  const { renderColumn } = useRenderColumn();

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
    <TwoRow
      isBottomFillSpace
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader
            headerText={intl.formatMessage({ id: "label.configureCentres" })}
            customStyles={styles.headerResponsiveStyle}
            rightSection={
              <CustomButton
                btnText={intl.formatMessage({
                  id: `label.${responsive.isMd ? "addNewCentre" : "newCentre"}`,
                })}
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
              currentTableData,
              setCurrentTableData,
              currentDataLength,
              setCurrentDataLength,
            }}
            originalData={CONFIGURE_CENTRES}
            columnsToBeSearchFrom={["centreName", "centreId"]}
          />
        </div>
      }
    />
  );
};

export default ConfigureCentres;
