import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import moment from "moment/moment";
import { ThemeContext } from "core/providers/theme";
import { Input, Switch, Image } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import DataTable from "../../components/DataTable";
import CustomButton from "../../components/CustomButton/CustomButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
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

  const goToEditCentrePage = (centreId, editable) => {
    navigate(`/view-centre-details?centreId=${centreId}&edit=${editable}`);
  };

  const onHandleCentreStatus = (centreId) => {
    // TODO: do an api call for updating real data into the database.
    const updatedData = currentTableData.map((item) => {
      if (centreId === item.centreId) {
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
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.centreName" })}
        </p>
      ),
      dataIndex: "centreName",
      key: "centreName",
      sorter: (a, b) => a.centreName.localeCompare(b.centreName),
      render: (text) => (
        <p className={[styles.boldText, styles.textEllipsis].join(" ")}>
          {text}
        </p>
      ),
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.centreId" })}
        </p>
      ),
      dataIndex: "centreId",
      key: "centreId",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.bigSmallCentre" })}
        </p>
      ),
      dataIndex: "bigSmallCentre",
      key: "bigSmallCentre",
      render: (text) => <p className={styles.textEllipsis}>{text}</p>,
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.dateCreated" })}
        </p>
      ),
      dataIndex: "createdOn",
      key: "createdOn",
      render: (data) => moment(data).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.createdOn).unix() - moment(b.createdOn).unix(),
      sortDirection: ["ascend"],
      defaultSortOrder: "ascend",
    },
    {
      title: () => (
        <p className={styles.columnHeading}>
          {intl.formatMessage({ id: "label.status" })}
        </p>
      ),
      dataIndex: "status",
      key: "status",
      render: (_, data) => {
        const { status } = data;
        return (
          <div className={styles.centreStatusContainer}>
            <Switch
              checked={status}
              onClick={() => onHandleCentreStatus(data.centreId)}
              className={status ? styles.switchBgColor : ""}
            />
            <p>
              {status
                ? intl.formatMessage({ id: "label.active" })
                : intl.formatMessage({ id: "label.inactive" })}
            </p>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (_, rowData) => {
        const { id } = rowData;
        return (
          <Image
            src={getImage("edit")}
            preview={false}
            className={styles.editIcon}
            onClick={() => goToEditCentrePage(id, true)}
          />
        );
      },
    },
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
