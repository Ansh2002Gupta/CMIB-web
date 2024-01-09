import React, { useContext, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import DataTable from "../../components/DataTable";
import { CONFIGURE_CENTRES } from "../../dummyData";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";

import { classes } from "./SetupCenter.styles";
import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTableData, setCurrentTableData] = useState(CONFIGURE_CENTRES);
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  const goToEditCentrePage = (rowData, isEdit) => {
    const centreId = rowData?.centreId;
    navigate(`/session/setup-centers/details/${centreId}?edit=${isEdit}`);
  };

  // TODO: below code inside useEffect is only for dummy data, will remove it once API is integrated
  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = CONFIGURE_CENTRES.slice(startIndex, endIndex);
    setCurrentTableData(updatedData);
  };

  const onChangePageSize = (size) => {
    //NOTE: if you want to do anything on changing of page size please consider doing it here
    setPageSize(Number(size));
    setCurrent(1);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], size);
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      return prev;
    });
    updateTableData(1, size);
  };

  const onChangeCurrentPage = (newPageNumber) => {
    //NOTE: if you want to do anything on changing of current page number please consider doing it here
    setCurrent(newPageNumber);
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], newPageNumber);
      return prev;
    });
    updateTableData(newPageNumber, pageSize);
  };

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
        onClick: (rowData) => goToEditCentrePage(rowData, true),
        preview: false,
        src: getImage(true ? "edit" : "eye"),
        visible: true,
      },
    }),
  ];

  useLayoutEffect(() => {
    const currentPage = +searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE);
    const currentPagePerRow = +searchParams.get(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
        return prev;
      });
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      setSearchParams((prev) => {
        prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
        return prev;
      });
    }
  }, []);

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
            pageSize,
            onChangePageSize,
            onChangeCurrentPage,
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
