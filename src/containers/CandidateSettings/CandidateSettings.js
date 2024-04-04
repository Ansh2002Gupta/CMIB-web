import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import dayjs from "dayjs";
import { Image } from "antd";

import CandidateSettingsTemplate from "./CandidateSettingsTemplate";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import {
  compareTwoDayjsDates,
  handleDisabledEndTime,
  handleDisabledStartTime,
  isNotAFutureDate,
} from "../../constant/utils";
import styles from "./CandidateSettings.module.scss";
import { classes } from "./CandidateSettings.styles";

const CandidateSettings = ({
  errors,
  formErrors,
  formFields,
  getInitialFields,
  getRoundTwoInitialFields,
  hasRoundTwo,
  handleInputChange,
  handleAdd,
  handleRemove,
  handleCandidateDataChange,
  roundCentres,
  selectedCenterTableData,
  isEditable,
  tableData,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { renderColumn } = useRenderColumn();

  const fields = hasRoundTwo
    ? getRoundTwoInitialFields(
        formFields?.max_no_of_interview,
        formFields?.max_no_of_offer
      )
    : getInitialFields(
        formFields?.max_no_of_interview,
        formFields?.max_no_of_offer,
        formFields?.big_centre_start_date,
        formFields?.big_centre_end_date,
        formFields?.small_centre_start_date,
        formFields?.small_centre_end_date
      );

  const filteredCurrentCenters = roundCentres?.filter((currentCenter) =>
    tableData.every(
      (tableItem) => tableItem?.centre_name !== currentCenter?.name
    )
  );

  const dropdownItems = filteredCurrentCenters?.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.name,
    };
  });

  const editConfigurations = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centre" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre_name",
      key: "centre_name",
      renderDropdown: {
        customInputStyles: styles.dropdownStyle,
        visible: true,
        dropdownItems: dropdownItems,
        onDropdownChange: (val, record, index) =>
          handleCandidateDataChange(val, "centre_name", index, true),
        customdropDownStyles: styles.selectCenterContainer,
        customtextStyles: styles.placeholderStyle,
        dropdownPlaceholder: intl.formatMessage({
          id: "label.placeholder.select_centre",
        }),
        getDropdownError: (index) => errors[index]?.centre_name,
        selectedValue: (record) => {
          return record?.centre_name;
        },
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_date",
      key: "from_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (isNotAFutureDate(current)) return true;
          if (
            compareTwoDayjsDates({
              current,
              date: record?.to_date,
              checkForFuture: true,
            })
          )
            return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_from_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "from_date",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.from_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_date",
      key: "to_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (
            compareTwoDayjsDates({
              current,
              date: record?.from_date,
              checkForFuture: false,
            })
          )
            return true;
          if (isNotAFutureDate(current)) return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_to_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "to_date",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.to_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_time",
      key: "from_time",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {
          return handleDisabledStartTime(record?.from_time);
        },
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.select_from_time",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("HH:mm:ss") : "",
            "from_time",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.from_time,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_time",
      key: "to_time",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledTime: (current, record) => {
          return handleDisabledEndTime(record?.to_time);
        },
        visible: true,
        type: "time",
        placeholder: intl.formatMessage({
          id: "label.select_to_time",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("HH:mm:ss") : "",
            "to_time",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.to_time,
      },
    }),
    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record, index) => (
        <Image
          className={styles.customImageStyle}
          src={getImage(record?.isAddRow ? "addCircle" : "minusCircle")}
          alt="add/remove"
          preview={false}
          onClick={() => {
            if (record?.isAddRow) {
              handleAdd(index);
            } else {
              handleRemove(index);
            }
          }}
        />
      ),
    },
  ];

  const roundTwoEditConfigurations = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centre" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre_name",
      key: "centre_name",
      renderDropdown: {
        visible: true,
        dropdownItems: dropdownItems,
        onDropdownChange: (val, record, index) =>
          handleCandidateDataChange(val, "centre_name", index, true),
        customdropDownStyles: styles.selectCenterContainer,
        customtextStyles: styles.placeholderStyle,
        dropdownPlaceholder: intl.formatMessage({
          id: "label.placeholder.select_centre",
        }),
        getDropdownError: (index) => errors[index]?.centre_name,
        selectedValue: (record) => {
          return record?.centre_name;
        },
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_date",
      key: "from_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (isNotAFutureDate(current)) return true;
          if (
            compareTwoDayjsDates({
              current,
              date: record?.to_date,
              checkForFuture: true,
            })
          )
            return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_from_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "from_date",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.from_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_date",
      key: "to_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (
            compareTwoDayjsDates({
              current,
              date: record?.from_date,
              checkForFuture: false,
            })
          )
            return true;
          if (isNotAFutureDate(current)) return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_to_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "to_date",
            index,
            true
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.to_date,
      },
    }),
    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record, index) => (
        <Image
          className={styles.customImageStyle}
          src={getImage(record?.isAddRow ? "addCircle" : "minusCircle")}
          alt="add/remove"
          preview={false}
          onClick={() => {
            if (record?.isAddRow) {
              handleAdd(index);
            } else {
              handleRemove(index);
            }
          }}
        />
      ),
    },
  ];

  const viewConfigurations = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centre" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre_name",
      key: "centre_name",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_date",
      key: "from_date",
      renderText: { visible: true, isTypeDate: false },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_date",
      key: "to_date",
      renderText: { visible: true, isTypeDate: false },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_time",
      key: "from_time",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_time" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_time",
      key: "to_time",
      renderText: { visible: true },
    }),
  ];

  const roundTwoViewConfigurations = [
    renderColumn({
      title: intl.formatMessage({ id: "label.centre" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "centre_name",
      key: "centre_name",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.from_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "from_date",
      key: "from_date",
      renderText: { visible: true, isTypeDate: false },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.to_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "to_date",
      key: "to_date",
      renderText: { visible: true, isTypeDate: false },
    }),
  ];

  const editSelectedCenter = [
    renderColumn({
      title: intl.formatMessage({ id: "label.start_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "big_centre_start_date",
      key: "big_centre_start_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (isNotAFutureDate(current)) return true;
          if (
            compareTwoDayjsDates({
              current,
              date: record?.big_centre_end_date,
              checkForFuture: true,
            })
          )
            return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_start_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "big_centre_start_date",
            index,
            false
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.big_centre_start_date,
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.end_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "big_centre_end_date",
      key: "big_centre_end_date",
      renderDateTime: {
        customInputStyle: classes.inputStyle,
        getDisabledDate: (current, record) => {
          if (
            compareTwoDayjsDates({
              current,
              date: record?.big_centre_start_date,
              checkForFuture: false,
            })
          )
            return true;
          if (isNotAFutureDate(current)) return true;
        },
        visible: true,
        type: "date",
        placeholder: intl.formatMessage({
          id: "label.select_end_date",
        }),
        onChange: (val, record, index) => {
          handleCandidateDataChange(
            val ? dayjs(val).format("YYYY-MM-DD") : "",
            "big_centre_end_date",
            index,
            false
          );
        },
        isEditable: true,
        getError: (index) => errors[index]?.big_centre_end_date,
      },
    }),
  ];

  const viewSelectedCenter = [
    renderColumn({
      title: intl.formatMessage({ id: "label.start_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "big_centre_start_date",
      key: "big_centre_start_date",
      renderText: { visible: true, isTypeDate: false },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.end_date" }),
      customColumnHeading: styles.columnHeading,
      dataIndex: "big_centre_end_date",
      key: "big_centre_end_date",
      renderText: { visible: true, isTypeDate: false },
    }),
  ];

  return (
    <CandidateSettingsTemplate
      {...{
        editConfigurations,
        editSelectedCenter,
        fields,
        formErrors,
        handleInputChange,
        hasRoundTwo,
        intl,
        isEditable,
        roundTwoEditConfigurations,
        roundTwoViewConfigurations,
        tableData,
        selectedCenterTableData,
        viewConfigurations,
        viewSelectedCenter,
      }}
    />
  );
};

export default CandidateSettings;
