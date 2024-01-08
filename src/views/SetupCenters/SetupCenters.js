import React, { useContext, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import DataTable from "../../components/DataTable";
import { CONFIGURE_CENTRES } from "../../dummyData";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";

import { classes } from "./SetupCenter.styles";
import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();

  const [currentTableData, setCurrentTableData] = useState(CONFIGURE_CENTRES);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const goToEditCentrePage = (rowData) => {
    navigate(`/view-centre-details?centreId=${rowData?.centreId}&edit=${true}`);
  };

  // TODO: below code inside useEffect is only for dummy data, will remove it once API is integrated
  useEffect(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;
    const updatedData = CONFIGURE_CENTRES.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  }, [current, pageSize]);

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "sNo",
      key: "sNo",
      renderText: {
        visible: true,
        includeDotAfterText: true,
        textStyles: styles.textStyles,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "centreName",
      key: "centreName",
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
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToEditCentrePage(rowData),
        preview: false,
        src: getImage(true ? "edit" : "eye"),
        visible: true,
      },
    }),
  ];

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.headerContainer}
          topSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "setupCentres.heading" })}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.descriptionText}>
              {intl.formatMessage({ id: "setupCentres.warning" })}
            </Typography>
          }
        />
      }
      bottomSection={
        <DataTable
          {...{
            columns,
            current,
            setCurrent,
            pageSize,
            setPageSize,
          }}
          currentDataLength={CONFIGURE_CENTRES.length}
          customContainerStyles={styles.tableContainer}
          originalData={currentTableData}
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
      isBottomFillSpace
    />
  );
};

export default SetupCenter;
