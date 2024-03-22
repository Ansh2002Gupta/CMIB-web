import { Image, Typography } from "antd";

import { SORT_VALUES } from "../../constant/constant";
import styles from "./AllJobsTable.module.scss";

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
  } = queriesColumnProperties;
  const isTableInSelectAllMode =
    selectedItemsList?.length !== 0 && !isSelectedFromTick;
  const sortByName = sortField === "name" ? sortBy : "";
  const sortByCreatedAt = sortField === "created_at" ? sortBy : "";

  const handleMenuItemClick = (rowData, item) => {};

  return [
    renderColumn({
      renderTitleWithCheckbox: {
        visible: true,
        titleWithCheckBoxes: !isTableInSelectAllMode
          ? intl.formatMessage({ id: "label.jobId" })
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
        : intl.formatMessage({ id: "label.company_name" }),
      customColumnHeading: [styles.extraWidth, styles.columnHeading].join(" "),
      dataIndex: "name",
      key: "name",
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
            id: "label.designation",
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
            id: "label.applicants",
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
            id: "label.active/inactive",
          }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "status",
      key: "status",
      renderChip: {
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
            label: intl.formatMessage({ id: "label.view_job_details" }),
          },
          {
            key: 2,
            label: intl.formatMessage({ id: "label.approve" }),
          },
        ],
        onMenuClick: (rowData, item) => handleMenuItemClick(rowData, item),
        menuPreview: false,
        menuSrc: getImage("more"),
        visible: true,
      },
    }),
  ];
};
