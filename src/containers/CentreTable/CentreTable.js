import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Image, Select, Table, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomDateTimePicker from "../../components/CustomDateTimePicker/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput/CustomInput";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import {
  INTERVIEW_TYPE,
  MAX_CTC_LENGTH,
  MAX_PARTNERS_LENGTH,
  MAX_VACANCIES_LENGTH,
  MODULE_KEYS,
  PAYMENT_TYPE,
} from "../../constant/constant";
import { classes } from "./CentreTable.styles";
import styles from "./CentreTable.module.scss";
import "./Override.css";

const CentreTable = ({
  addTableData,
  errors,
  hasRoundTwo,
  isEdit,
  isNqcaModule,
  paymentType,
  selectedModule,
  setErrors,
  setTableData,
  tableData,
  validate,
}) => {
  const intl = useIntl();
  const [selectedDates, setSelectedDates] = useState([]);
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const isCentreWisePayment = paymentType === PAYMENT_TYPE.CENTRE_WISE;
  const isOverseasModule = selectedModule === MODULE_KEYS.OVERSEAS_CHAPTERS_KEY;

  useEffect(() => {
    const dates = tableData.map((data) => data.scheduleDate);
    setSelectedDates(dates);
  }, [tableData]);

  const handleRemove = (index) => {
    const filteredData = tableData.filter((item, idx) => idx !== index);
    setTableData(filteredData);
    setErrors((prevErrors) => prevErrors.filter((item, idx) => idx !== index));
  };

  const handleAdd = (record, index) => {
    if (validate(index)) {
      setTableData((prevTableData) => {
        delete prevTableData[index].isAddRow;
        return [...prevTableData, addTableData];
      });

      setErrors((prevErrors) => [
        ...prevErrors,
        {
          scheduleDate: "",
          ...(isCentreWisePayment && {
            participationFee: "",
          }),
          ...(isCentreWisePayment && {
            firm: { firmFee: "", uptoPartners: "" },
          }),
          ...(isNqcaModule && { norm1: "" }),
          ...(isNqcaModule && { norm2: "" }),
          ...(isNqcaModule && { norm2MinVacancy: "" }),
          ...(isOverseasModule && {
            interviewType: "",
          }),
        },
      ]);
    }
  };

  const isDateDisabled = (current) => {
    const isBeforeTomorrow =
      current && current < dayjs().add(1, "day").startOf("day");
    const isAlreadySelected = selectedDates.some((date) =>
      dayjs(date).isSame(current, "day")
    );
    return isBeforeTomorrow || isAlreadySelected;
  };

  const handleInputChange = (value, name, index, nestedName) => {
    setTableData((prevTableData) => {
      const newTableData = [...prevTableData];
      if (nestedName) {
        const updatedNestedData = {
          ...newTableData[index][name],
          [nestedName]: value,
        };
        newTableData[index] = {
          ...newTableData[index],
          [name]: updatedNestedData,
        };
      } else {
        newTableData[index] = {
          ...newTableData[index],
          [name]: value,
        };
      }
      return newTableData;
    });

    if (value === null || value === "") {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        if (nestedName) {
          newErrors[index] = {
            ...newErrors[index],
            [name]: {
              ...newErrors[index][name],
              [nestedName]: intl.formatMessage({
                id: "label.error.fieldEmpty",
              }),
            },
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
          };
        }
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        if (nestedName) {
          newErrors[index] = {
            ...newErrors[index],
            [name]: {
              ...newErrors[index][name],
              [nestedName]: "",
            },
          };
        } else {
          newErrors[index] = {
            ...newErrors[index],
            [name]: "",
          };
        }
        return newErrors;
      });
    }
  };

  const columns = [
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.scheduleDate" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      className: styles.tableHeader,
      key: "scheduleDate",
      render: (text, record, index) => ({
        props: {
          className:
            isNqcaModule || isCentreWisePayment
              ? ""
              : styles.inputTableStyleFixedWidth,
        },
        children: (
          <CustomDateTimePicker
            value={text?.scheduleDate ? dayjs(text?.scheduleDate) : null}
            customTimeStyle={
              isNqcaModule || isCentreWisePayment
                ? styles.inputStyle
                : styles.inputStyleFixedWidth
            }
            type="date"
            onChange={(val) => {
              handleInputChange(
                val ? dayjs(val).format("YYYY-MM-DD") : "",
                "scheduleDate",
                index
              );
            }}
            disabledDate={isDateDisabled}
            placeholder={intl.formatMessage({
              id: "centre.placeholder.selectDate",
            })}
            errorMessage={errors[index]?.scheduleDate}
            isError={!!errors[index]?.scheduleDate}
          />
        ),
      }),
    },
    ...(isOverseasModule
      ? [
          {
            title: () => (
              <Typography className={styles.tableHeader}>
                {intl.formatMessage({ id: "centre.onlineOffline" })}
                <span className={styles.redText}> *</span>
              </Typography>
            ),
            dataIndex: "interviewType",
            key: "interviewType",
            render: (text, record, index) => ({
              props: {
                className:
                  isNqcaModule || isCentreWisePayment
                    ? ""
                    : styles.inputTableStyleFixedWidth,
              },
              children: (
                <TwoRow
                  className={styles.errorGap}
                  topSection={
                    <Select
                      bordered={false}
                      size={"large"}
                      style={classes.interviewTypeDropDown}
                      className={
                        isNqcaModule || isCentreWisePayment
                          ? styles.inputDropdownStyle
                          : styles.inputDropdownStyleFixedWidth
                      }
                      onChange={(val) =>
                        handleInputChange(val, "interviewType", index)
                      }
                      options={INTERVIEW_TYPE}
                      placeholder={intl.formatMessage({
                        id: `centre.placeholder.selectOnlineOffline`,
                      })}
                      value={!text?.length ? null : text}
                    />
                  }
                  bottomSection={
                    !!errors[index]?.interviewType ? (
                      <Typography className={styles.redText}>
                        <span className={styles.redText}>* </span>
                        {errors[index]?.interviewType}
                      </Typography>
                    ) : (
                      <></>
                    )
                  }
                />
              ),
            }),
          },
        ]
      : []),
    ...(isCentreWisePayment
      ? [
          {
            title: () => (
              <Typography className={styles.tableHeader}>
                {intl.formatMessage({ id: "centre.participationFee" })}
                <span className={styles.redText}> *</span>
              </Typography>
            ),
            dataIndex: "participationFee",
            key: "participationFee",
            render: (text, record, index) => (
              <CustomInput
                type="inputNumber"
                value={text}
                customContainerStyles={styles.customContainerStyles}
                customInputNumberStyles={styles.inputNumberStyle}
                onChange={(val) => {
                  handleInputChange(val, "participationFee", index);
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterFee",
                })}
                maxLength={MAX_CTC_LENGTH}
                errorMessage={errors[index]?.participationFee}
                isError={!!errors[index]?.participationFee}
              />
            ),
          },
        ]
      : []),
    ...(isCentreWisePayment
      ? [
          {
            title: () => (
              <TwoColumn
                className={styles.twoJointContainer}
                leftSectionStyle={classes.flexStyle}
                leftSection={
                  <Typography className={styles.tableHeader}>
                    {intl.formatMessage({ id: "centre.firmFee" })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
                rightSectionStyle={classes.flexStyle}
                rightSection={
                  <Typography className={styles.tableHeader}>
                    {intl.formatMessage({ id: "centre.uptoPartners" })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
              />
            ),
            dataIndex: "firm",
            key: "firm",
            render: (text, record, index) => {
              return (
                <TwoColumn
                  leftSectionClassName={styles.sectionStyle}
                  rightSectionClassName={styles.sectionStyle}
                  className={styles.customColumnStyle}
                  leftSection={
                    <CustomInput
                      type="inputNumber"
                      value={text?.firmFee}
                      customContainerStyles={styles.customContainerStyles}
                      customInputNumberStyles={
                        styles.joinedCustomContainerStyles
                      }
                      onChange={(val) => {
                        handleInputChange(val, "firm", index, "firmFee");
                      }}
                      placeholder={intl.formatMessage({
                        id: "centre.placeholder.enterFee",
                      })}
                      maxLength={MAX_CTC_LENGTH}
                      errorMessage={errors[index]?.firm?.firmFee}
                      isError={!!errors[index]?.firm?.firmFee}
                    />
                  }
                  rightSection={
                    <CustomInput
                      controls
                      type="inputNumber"
                      customContainerStyles={styles.customContainerStyles}
                      customInputNumberStyles={styles.inputPartnersStyle}
                      value={text?.uptoPartners}
                      onChange={(val) => {
                        handleInputChange(val, "firm", index, "uptoPartners");
                      }}
                      maxLength={MAX_PARTNERS_LENGTH}
                      placeholder={intl.formatMessage({
                        id: "centre.placeholder.enterpartner",
                      })}
                      errorMessage={errors[index]?.firm?.uptoPartners}
                      isError={!!errors[index]?.firm?.uptoPartners}
                    />
                  }
                />
              );
            },
          },
        ]
      : []),
    ...(isNqcaModule
      ? [
          {
            title: () => (
              <Typography className={styles.tableHeader}>
                {intl.formatMessage({ id: "centre.norm1" })}
                <span className={styles.redText}> *</span>
              </Typography>
            ),
            dataIndex: "norm1",
            key: "norm1",
            render: (text, record, index) => (
              <CustomInput
                type="inputNumber"
                value={text}
                customContainerStyles={styles.customContainerStyles}
                customInputNumberStyles={styles.inputNumberStyle}
                onChange={(val) => {
                  handleInputChange(val, "norm1", index);
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterNorm1",
                })}
                maxLength={MAX_CTC_LENGTH}
                errorMessage={errors[index]?.norm1}
                isError={!!errors[index]?.norm1}
              />
            ),
          },
        ]
      : []),
    ...(isNqcaModule
      ? [
          {
            title: () => (
              <Typography className={styles.tableHeader}>
                {intl.formatMessage({ id: "centre.norm2" })}
                <span className={styles.redText}> *</span>
              </Typography>
            ),
            dataIndex: "norm2",
            key: "norm2",
            render: (text, record, index) => (
              <CustomInput
                type="inputNumber"
                value={text}
                customContainerStyles={styles.customContainerStyles}
                customInputNumberStyles={styles.inputNumberStyle}
                onChange={(val) => {
                  handleInputChange(val, "norm2", index);
                }}
                maxLength={MAX_CTC_LENGTH}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterNorm2",
                })}
                errorMessage={errors[index]?.norm2}
                isError={!!errors[index]?.norm2}
              />
            ),
          },
        ]
      : []),
    ...(isNqcaModule
      ? [
          {
            title: () => (
              <Typography className={styles.tableHeader}>
                {intl.formatMessage({ id: "centre.norm2MinVacancy" })}
                <span className={styles.redText}> *</span>
              </Typography>
            ),
            dataIndex: "norm2MinVacancy",
            key: "norm2MinVacancy",
            render: (text, record, index) => (
              <CustomInput
                type="inputNumber"
                value={text}
                customContainerStyles={styles.customContainerStyles}
                customInputNumberStyles={styles.inputNumberStyle}
                onChange={(val) => {
                  handleInputChange(val, "norm2MinVacancy", index);
                }}
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.enterVacancy",
                })}
                maxLength={MAX_VACANCIES_LENGTH}
                errorMessage={errors[index]?.norm2MinVacancy}
                isError={!!errors[index]?.norm2MinVacancy}
              />
            ),
          },
        ]
      : []),

    {
      title: " ",
      dataIndex: "remove",
      key: "remove",
      render: (text, record, index) =>
        isEdit && (
          <Image
            className={styles.imageStyle}
            src={getImage(record?.isAddRow ? "addCircle" : "minusCircle")}
            alt="add/remove"
            preview={false}
            onClick={() => {
              if (record?.isAddRow) {
                handleAdd(record, index);
              } else {
                handleRemove(index);
              }
            }}
          />
        ),
    },
  ];

  const renderRound2Colomn = [
    {
      title: () => (
        <Typography className={styles.tableHeader}>
          {intl.formatMessage({ id: "centre.scheduleDate" })}
          <span className={styles.redText}> *</span>
        </Typography>
      ),
      className: styles.tableHeader,
      key: "scheduleDate",
      render: (text, record, index) => ({
        props: {
          className:
            isNqcaModule || isCentreWisePayment
              ? ""
              : styles.inputTableStyleFixedWidth,
        },
        children: (
          <CustomDateTimePicker
            value={text?.scheduleDate ? dayjs(text?.scheduleDate) : null}
            customTimeStyle={
              isNqcaModule || isCentreWisePayment
                ? styles.inputStyle
                : styles.inputStyleFixedWidth
            }
            type="date"
            onChange={(val) => {
              handleInputChange(
                val ? dayjs(val).format("YYYY-MM-DD") : "",
                "scheduleDate",
                index
              );
            }}
            disabledDate={isDateDisabled}
            placeholder={intl.formatMessage({
              id: "centre.placeholder.selectDate",
            })}
            errorMessage={errors[index]?.scheduleDate}
            isError={!!errors[index]?.scheduleDate}
          />
        ),
      }),
    },
  ];

  const viewConfigurationDetailsRound2 = [
    renderColumn({
      title: intl.formatMessage({ id: "centre.scheduleDate" }),
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      renderText: { visible: true, isTypeDate: true },
    }),
  ];

  const viewConfigurationDetails = [
    renderColumn({
      title: intl.formatMessage({ id: "centre.scheduleDate" }),
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      renderText: { visible: true, isTypeDate: true },
    }),
    ...(isCentreWisePayment
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.participationFee" }),
            dataIndex: "participationFee",
            key: "participationFee",
            renderText: {
              visible: true,
            },
          }),
        ]
      : []),
    ...(isCentreWisePayment
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.firmFee" }),
            dataIndex: "firm",
            key: "firm",
            renderText: {
              visible: true,
              isDataObject: true,
              dataKey: "firmFee",
            },
          }),
        ]
      : []),
    ...(isCentreWisePayment
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.uptoPartners" }),
            dataIndex: "firm",
            key: "firm",
            renderText: {
              visible: true,
              isDataObject: true,
              dataKey: "uptoPartners",
            },
          }),
        ]
      : []),
    ...(isNqcaModule
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.norm1" }),
            dataIndex: "norm1",
            key: "norm1",
            renderText: { visible: true },
          }),
        ]
      : []),
    ...(isNqcaModule
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.norm2" }),
            dataIndex: "norm2",
            key: "norm2",
            renderText: { visible: true },
          }),
        ]
      : []),
    ...(isNqcaModule
      ? [
          renderColumn({
            title: intl.formatMessage({ id: "centre.norm2MinVacancy" }),
            dataIndex: "norm2MinVacancy",
            key: "norm2MinVacancy",
            renderText: { visible: true },
          }),
        ]
      : []),
  ];

  return (
    <div
      className={`${
        hasRoundTwo && isEdit ? styles.roundTwoEditContainer : {}
      } ${isEdit ? styles.editContainer : styles.container}`}
    >
      <Table
        columns={
          hasRoundTwo
            ? isEdit
              ? renderRound2Colomn
              : viewConfigurationDetailsRound2
            : isEdit
            ? columns
            : viewConfigurationDetails
        }
        dataSource={tableData}
        pagination={false}
        rowClassName={!isEdit ? styles.rowtext : ""}
        scroll={{ x: "max-content" }}
        className={`${isEdit ? "customTable" : ""} ${
          styles.table
        } customTableNoHover`}
        rowKey="id"
      />
    </div>
  );
};

CentreTable.defaultProps = {
  isEdit: true,
  isNqcaModule: false,
  selectedModule: "",
  tableData: [],
  setTableData: () => {},
};

CentreTable.propTypes = {
  addTableData: PropTypes.object,
  errors: PropTypes.array,
  isEdit: PropTypes.bool,
  isNqcaModule: PropTypes.bool,
  selectedModule: PropTypes.any,
  setErrors: PropTypes.func,
  setTableData: PropTypes.func,
  tableData: PropTypes.array,
  validate: PropTypes.func,
};

export default CentreTable;
