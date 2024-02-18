import React, { useContext, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/DataTable";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { ORIENTATION_CENTERS } from "../../dummyData";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";

import { classes } from "./OrientationCenter.styles";
import styles from "./OrientationCenter.module.scss";

const OrientationCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTableData, setCurrentTableData] = useState(ORIENTATION_CENTERS);
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );

  // TODO: below code inside useEffect is only for dummy data, will remove it once API is integrated
  const updateTableData = (currentPageNumber, currentPageSize) => {
    const startIndex = (currentPageNumber - 1) * currentPageSize;
    const endIndex = currentPageNumber * currentPageSize;
    const updatedData = ORIENTATION_CENTERS.slice(startIndex, endIndex);
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
      renderText: {
        isTextBold: true,
        visible: true,
      },
      customStyles: styles.customNameColumnStyles,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.total_students_booked" }),
      dataIndex: "totalStudentsBooked",
      key: "totalStudentsBooked",
      renderText: { visible: true },
      customStyles: styles.customColumnStyles,
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.schedule_date" }),
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      isRequiredField: true,
      renderText: { visible: true, isTypeDate: true },
      renderDateTime: {
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.placeholder.consentFromDate",
        }),
      },
      customStyles: styles.customColumnStyles,
      onChange: () => {},
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.venue" }),
      dataIndex: "bigSmallCentre",
      key: "bigSmallCentre",
      renderAutoPlaceComplete: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "download",
        onClick: () => {},
        preview: false,
        src: getImage("iconDownload"),
        visible: true,
        customImageStyle: styles.imageStyle,
      },
      customStyles: styles.customIconContainer,
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
              {intl.formatMessage({ id: "label.setup_orientation_centers" })}
            </Typography>
          }
          bottomSection={
            <Typography className={styles.descriptionText}>
              {intl.formatMessage({ id: "label.orientation_centers_warning" })}
            </Typography>
          }
        />
      }
      bottomSection={
        <TwoRow
          topSection={
            <DataTable
              {...{
                columns,
                current,
                pageSize,
                onChangePageSize,
                onChangeCurrentPage,
              }}
              currentDataLength={ORIENTATION_CENTERS.length}
              customContainerStyles={styles.tableContainer}
              originalData={currentTableData}
            />
          }
          bottomSection={
            <TwoColumn
              className={styles.buttonContainer}
              leftSection={
                <CustomButton
                  btnText={intl.formatMessage({
                    id: "label.cancel",
                  })}
                  customStyle={styles.mobileButtonStyles}
                  textStyle={styles.textStyle}
                  onClick={() => {}}
                />
              }
              rightSection={
                <CustomButton
                  textStyle={styles.saveButtonTextStyles}
                  customStyle={styles.saveButtonStyle}
                  btnText={intl.formatMessage({
                    id: "session.saveChanges",
                  })}
                  onClick={() => {}}
                />
              }
            />
          }
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
      isBottomFillSpace
    />
  );
};

export default OrientationCenter;