import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { DatePicker, Form, Image, Select, Switch, Typography } from "antd";
import moment from "moment";

import { TwoRow, TwoColumn, ThreeRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { FormatDate } from "../../constant/utils";
import { classes } from "./SessionDetails.styles";
import styles from "./SessionDetails.module.scss";

const SessionDetails = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);

  const [formErrors, setFormErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    sessionName: "Campus Placement Programme",
    natureOfGoods: "Services/goods",
    invoiceNumberFormat: "Augsept-***-2023",
    examinationSessionPeriod: ["May 2023", "November 2023"],
    gmcsCompletetionDate: moment(),
    membershipCompletetionDate: moment(),
    articleshipCompletetionFromDate: moment(),
    articleshipCompletetionToDate: moment(),
    bankACNumberOffline: "1233 9344 0234 0234",
    bankACNumberOnline: "1233 9344 0234 0234",
    status: false,
  });

  const FIELDSONE = [
    {
      id: 1,
      headingIntl: "sessionName",
      headingLabel: "Session Name *",
      value: formData.sessionName,
      rules: [
        {
          required: true,
          message: "Please enter Session Name",
        },
      ],
    },
    {
      id: 2,
      headingIntl: "natureOfGoods",
      headingLabel: "Nature of services/goods *",
      value: formData.natureOfGoods,
      rules: [
        {
          required: true,
          message: "Please enter services/goods",
        },
      ],
    },
    {
      id: 3,
      headingIntl: "invoiceNumberFormat",
      headingLabel: "Performa Invoice Number Format *",
      value: formData.invoiceNumberFormat,
      rules: [
        {
          required: true,
          message: "Please enter Performa Invoice Number",
        },
      ],
    },
    {
      id: 4,
      headingIntl: "examinationSessionPeriod",
      headingLabel: "Examination Session Period *",
      value: formData.examinationSessionPeriod,
      selectOptions: [
        { label: "May 2025", value: "May 2025" },
        { label: "November 2025", value: "November 2025" },
        { label: "May 2024", value: "May 2024" },
        { label: "November 2024", value: "November 2024" },
        { label: "May 2023", value: "May 2023" },
        { label: "November 2023", value: "November 2023" },
        { label: "May 2022", value: "May 2022" },
        { label: "November 2022", value: "November 2022" },
        { label: "May 2021", value: "May 2021" },
        { label: "November 2021", value: "November 2021" },
        { label: "May 2020", value: "May 2020" },
        { label: "November 2020", value: "November 2022" },
      ],
      rules: [
        {
          required: true,
          message: "Please select atleast one Examination Session Period ",
        },
      ],
    },
    {
      id: 5,
      headingIntl: "gmcsCompletetionDate",
      headingLabel: "GMCS Completetion Date *",
      value: FormatDate(formData.gmcsCompletetionDate),
      rules: [
        {
          required: true,
          message: "Please select GMCS Completetion Date",
        },
      ],
    },
    {
      id: 6,
      headingIntl: "membershipCompletetionDate",
      headingLabel: "Membership Completetion Date *",
      value: FormatDate(formData.membershipCompletetionDate),
      rules: [
        {
          required: true,
          message: "Please select Membership Completetion Date",
        },
      ],
    },
    {
      id: 7,
      headingIntl: "articleshipCompletetionFromDate",
      headingLabel: "Articleship Completetion From Date *",
      value: FormatDate(formData.articleshipCompletetionFromDate),
      rules: [
        {
          required: true,
          message: "Please select Articleship Completetion From Date",
        },
      ],
    },
    {
      id: 8,
      headingIntl: "articleshipCompletetionToDate",
      headingLabel: "Articleship Completetion To Date *",
      value: FormatDate(formData.articleshipCompletetionToDate),
      rules: [
        {
          required: true,
          message: "Please select Articleship Completetion From Date",
        },
      ],
    },
    {
      id: 9,
      headingIntl: "bankACNumberOffline",
      headingLabel: "Bank A/C number offline *",
      value: formData.bankACNumberOffline,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number offline",
        },
      ],
    },
    {
      id: 10,
      headingIntl: "bankACNumberOnline",
      headingLabel: "Bank A/C number online*",
      value: formData.bankACNumberOnline,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number online",
        },
      ],
    },
  ];

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: undefined,
    });
  };

  return (
    <ThreeRow
      className={styles.sessionDetails}
      topSection={
        <TwoColumn
          className={styles.headerContainer}
          leftSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "session.sessionDetails" })}
            </Typography>
          }
          rightSection={
            !edit && (
              <TwoColumn
                onClick={() => {
                  setEdit(true);
                }}
                className={styles.editContainer}
                leftSection={
                  <Image
                    src={getImage("editIcon")}
                    className={styles.editIcon}
                    preview={false}
                  />
                }
                rightSection={
                  <Typography className={styles.blackText}>
                    {intl.formatMessage({ id: "session.edit" })}
                  </Typography>
                }
              />
            )
          }
        />
      }
      middleSection={
        <Form
          onFieldsChange={(changedFields, allFields) => {
            const errors = allFields.reduce((acc, field) => {
              if (field.errors.length > 0) {
                acc[field.name[0]] = field.errors;
              }
              return acc;
            }, {});
            setFormErrors(errors);
          }}
          onFinishFailed={(errorInfo) => {
            const errors = errorInfo.errorFields.reduce((acc, field) => {
              acc[field.name[0]] = field.errors;
              return acc;
            }, {});
            setFormErrors(errors);
          }}
          className={
            responsive.isMd ? styles.gridContainer : styles.mobileGridContainer
          }
          initialValues={formData}
        >
          {FIELDSONE.map((item) => {
            return (
              <TwoRow
                key={item.id}
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `session.${item.headingIntl}`,
                    })}
                    <span className={styles.redText}>*</span>
                  </Typography>
                }
                bottomSection={
                  edit ? (
                    <Form.Item
                      name={item.headingIntl}
                      rules={item.rules}
                      className={styles.formInputStyles}
                    >
                      {item.id === 5 ||
                      item.id === 6 ||
                      item.id === 7 ||
                      item.id === 8 ? (
                        <DatePicker
                          value={item.value}
                          className={styles.dateInput}
                          onChange={(val) => {
                            handleInputChange(val, item.headingIntl);
                          }}
                        />
                      ) : item.id === 4 ? (
                        <Select
                          size={"large"}
                          className={styles.multilpleInput}
                          onChange={(val) => {
                            handleInputChange(val, item.headingIntl);
                          }}
                          options={item.selectOptions}
                          value={item.value}
                          mode="multiple"
                        />
                      ) : (
                        <CustomInput
                          value={item.value}
                          disabled={!edit}
                          customLabelStyles={styles.inputLabel}
                          customInputStyles={styles.input}
                          customContainerStyles={styles.customContainerStyles}
                          onChange={(val) => {
                            handleInputChange(
                              val.target.value,
                              item.headingIntl
                            );
                          }}
                        />
                      )}
                    </Form.Item>
                  ) : item?.id !== 4 ? (
                    <Typography className={styles.blackText}>
                      {item.value}
                    </Typography>
                  ) : (
                    <div className={styles.examinationFieldContainer}>
                      {item.value.map((val) => (
                        <Typography className={styles.periodText}>
                          {val}
                        </Typography>
                      ))}
                    </div>
                  )
                }
              />
            );
          })}

          <TwoRow
            className={styles.gridItem}
            topSection={
              <Typography className={styles.grayText}>
                {intl.formatMessage({ id: "label.status" })}
                <span className={styles.redText}>*</span>
              </Typography>
            }
            bottomSection={
              <TwoColumn
                className={styles.statusContainer}
                leftSection={
                  <Switch
                    style={formData?.status && classes.switchBackground}
                    checked={formData?.status}
                    onChange={() => {
                      setFormData({
                        ...formData,
                        status: !formData.status,
                      });
                    }}
                    disabled={!edit}
                  />
                }
                rightSection={
                  <Typography className={styles.blackText}>
                    {intl.formatMessage({
                      id: `label.${formData?.status ? "active" : "inactive"}`,
                    })}
                  </Typography>
                }
              />
            }
          />
        </Form>
      }
      bottomSection={
        !!edit && (
          <TwoColumn
            className={styles.editContainer}
            leftSection={
              <CustomButton
                btnText={intl.formatMessage({
                  id: "label.cancel",
                })}
                customStyle={
                  responsive.isMd
                    ? styles.buttonStyles
                    : styles.mobileButtonStyles
                }
                textStyle={styles.textStyle}
                onClick={() => {
                  setEdit(false);
                }}
              />
            }
            rightSection={
              <CustomButton
                isBtnDisable={Object.keys(formErrors).length > 0}
                textStyle={styles.saveButtonTextStyles}
                btnText={intl.formatMessage({
                  id: "session.saveChanges",
                })}
              />
            }
          />
        )
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};
export default SessionDetails;
