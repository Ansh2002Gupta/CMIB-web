import { Image, Typography } from "antd";

import { SORT_VALUES } from "../../constant/constant";
import styles from "./QueryTable.module.scss";

export const getQueryColumn = ({
  intl,
  getImage,
  navigate,
  renderColumn,
  queriesColumnProperties = {},
  handleSorting,
  setIsConfirmationModalOpen,
  toggleSelectAllItems,
  areAllItemsSelected,
  areSomeItemsSelected,
  setSortBy,
  sortBy,
  sortField,
}) => {
  const {
    isSelectedFromTick,
    setIsSelectedFromTick,
    selectedItemsList,
    toggleSelectedQueriesId,
    handleMarkMutipleQueriesAsAnswered,
    setSelectedItemsList,
    setIsSingleSelect,
  } = queriesColumnProperties;
  const isTableInSelectAllMode = selectedItemsList?.length !== 0 && !isSelectedFromTick;
  const sortByName = sortField === "name" ? sortBy : "";
  const sortByCreatedAt = sortField === "created_at" ? sortBy : "";

  return [
    renderColumn({
      renderTitleWithCheckbox: {
        visible: true,
        titleWithCheckBoxes: !isTableInSelectAllMode
          ? intl.formatMessage({ id: "label.queriesId" })
          : intl.formatMessage({ id: "label.selectAll" }),
        onToggleCheckBox: toggleSelectAllItems,
        isIntermidiate: areSomeItemsSelected,
        isChecked: areAllItemsSelected,
        customCheckBoxStyles: styles.checkBoxContainer,
      },
      customColumnHeading: [
        styles.columnHeading,
        isTableInSelectAllMode ? styles.greenText : "",
      ].join(" "),
      dataIndex: "readable_id",
      key: "readable_id",
      renderTextWithCheckBoxes: {
        visible: true,
        isCheckBoxTextBold: true,
        customCheckBoxContainerStyles: [styles.tableCell, styles.gap_12px].join(
          " "
        ),
        checkBoxList: selectedItemsList,
        onClickCheckbox: (rowData) => {
          const { id } = rowData;
          toggleSelectedQueriesId(id);
        },
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({ id: "label.studentOrCompany" }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "name",
      key: "name",
      setSortBy: setSortBy,
      renderSorterColumn: true,
      isRequiredField: true,
      sortIcon:
        sortByName === SORT_VALUES.ASCENDING ||
        sortByName === SORT_VALUES.DESCENDING
          ? "arrowDownDarkGrey"
          : "disabledArrow",
      columnSortByHandler: handleSorting,
      customIconStyle: [styles[sortByName]],
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({
            id: "label.nonRegisteredStudentOrCompany",
          }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "type",
      key: "type",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({
            id: "label.queryStatus",
          }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "status",
      key: "status",
      renderChip: {
        visible: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({
            id: "label.email",
          }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "email",
      key: "email",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({
            id: "label.mobileNumber",
          }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "mobile",
      key: "mobile",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({
            id: "label.queryType",
          }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "query_type",
      key: "query_type",
      renderText: {
        visible: true,
        textStyles: [styles.tableCell].join(" "),
        isRequiredTooltip: true,
      },
    }),
    renderColumn({
      title: isTableInSelectAllMode
        ? ""
        : intl.formatMessage({ id: "label.createdOn" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "created_at",
      key: "created_at",
      renderSorterColumn: true,
      setSortBy: setSortBy,
      columnSortByHandler: handleSorting,
      sortIcon:
        sortByCreatedAt === SORT_VALUES.ASCENDING ||
        sortByCreatedAt === SORT_VALUES.DESCENDING
          ? "arrowDownDarkGrey"
          : "disabledArrow",
      customIconStyle: [styles[sortByCreatedAt]],
      renderText: {
        isTypeDate: true,
        visible: true,
        textStyles: [styles.tableCell].join(" "),
      },
    }),
    renderColumn({
      title: (
        <>
          {isTableInSelectAllMode ? (
            <Typography
              className={[styles.greenText, styles.textAtEnd].join(" ")}
              onClick={handleMarkMutipleQueriesAsAnswered}
            >
              {intl.formatMessage({
                id: "label.markSelectedQueriesAsAnswered",
              })}
            </Typography>
          ) : (
            ""
          )}
        </>
      ),
      dataIndex: "check",
      key: "check",
      render: (_, rowData) => {
        const isAnswered = rowData?.status?.toLowerCase() === "answered";
        return (
          <div
            className={[
              styles.iconContainer,
              isTableInSelectAllMode ? styles.iconBox : "",
            ].join(" ")}
          >
            <Image
              src={getImage("eye")}
              alt="eye"
              className={styles.clickable}
              preview={false}
              onClick={() => navigate(`queries-details/${rowData?.id}`)}
            />
            <Image
              src={getImage(`${!isAnswered ? "checkIcon" : "greenTick"}`)}
              alt="check"
              preview={false}
              className={
                isTableInSelectAllMode || isAnswered
                  ? styles.nonClickable
                  : styles.clickable
              }
              onClick={() => {
                if (!isTableInSelectAllMode && !isAnswered) {
                  setIsConfirmationModalOpen(true);
                  setIsSingleSelect(true);
                  setIsSelectedFromTick(true);
                  setSelectedItemsList([rowData?.id]);
                }
              }}
            />
          </div>
        );
      },
    }),
  ];
};
