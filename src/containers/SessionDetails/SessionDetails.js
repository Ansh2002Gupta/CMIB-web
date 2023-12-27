import React, { useState, useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { DatePicker, Form, Image, Select, Switch, Typography } from "antd";

import { TwoRow, TwoColumn, ThreeRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { FormatDate } from "../../constant/utils";
import { SESSION_DETAILS } from "../../dummyData";
import { classes } from "./SessionDetails.styles";
import styles from "./SessionDetails.module.scss";

const SessionDetails = ({ addSession, setAddSession }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { getImage } = useContext(ThemeContext);

  const [formErrors, setFormErrors] = useState({});
  const [edit, setEdit] = useState(addSession);
  const [session, setSession] = useState(true);
  const [formData, setFormData] = useState(SESSION_DETAILS);

  console.log("addSession", addSession);
  console.log("session", session);

  const FIELDSONE = [
    {
      id: 1,
      headingIntl: "sessionName",
      label: "name",
      value: formData?.name,
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
      label: "nature_of_service",
      value: formData?.nature_of_service,
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
      label: "perform_invoice_no_format",
      value: formData?.perform_invoice_no_format,
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
      label: "examination_session_period",
      value: formData?.examination_session_period,
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
      label: "gmcs_completion_date",
      value: FormatDate(formData?.gmcs_completion_date),
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
      label: "membership_completion_date",
      value: FormatDate(formData?.membership_completion_date),
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
      label: "session_start_date",
      value: FormatDate(formData?.session_start_date),
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
      label: "article_completion_from_date",
      value: FormatDate(formData?.article_completion_from_date),
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
      label: "bank_account_offline",
      value: formData?.bank_account_offline,
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
      label: "bank_account_online",
      value: formData?.bank_account_online,
      rules: [
        {
          required: true,
          message: "Please enter Bank A/C number online",
        },
      ],
    },
  ];

  useEffect(() => {
    setEdit(addSession);
    setSession(addSession);
    if (addSession) {
      setFormData({});
    }
  }, [addSession]);

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

  const handleCancel = () => {
    setFormData(SESSION_DETAILS);
    setEdit(false);
    setAddSession(false);
  };
  const handleSave = () => {
    setEdit(false);
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
        // <Form
        //   onFieldsChange={(changedFields, allFields) => {
        //     const errors = allFields.reduce((acc, field) => {
        //       if (field.errors.length > 0) {
        //         acc[field.name[0]] = field.errors;
        //       }
        //       return acc;
        //     }, {});
        //     setFormErrors(errors);
        //   }}
        //   onFinishFailed={(errorInfo) => {
        //     const errors = errorInfo.errorFields.reduce((acc, field) => {
        //       acc[field.name[0]] = field.errors;
        //       return acc;
        //     }, {});
        //     setFormErrors(errors);
        //   }}
        // className={
        //   responsive.isMd ? styles.gridContainer : styles.mobileGridContainer
        // }
        //   initialValues={formData}
        // >
        <div
          className={
            responsive.isMd ? styles.gridContainer : styles.mobileGridContainer
          }
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
                    // <Form.Item
                    //   name={item.label}
                    //   rules={item.rules}
                    //   className={styles.formInputStyles}
                    // >
                    <div className={styles.formInputStyles}>
                      {item.id === 5 ||
                      item.id === 6 ||
                      item.id === 7 ||
                      item.id === 8 ? (
                        <DatePicker
                          //value={item.value}
                          className={styles.dateInput}
                          onChange={(val) => {
                            handleInputChange(val, item.label);
                          }}
                        />
                      ) : item.id === 4 ? (
                        <Select
                          size={"large"}
                          className={styles.multilpleInput}
                          onChange={(val) => {
                            handleInputChange(val, item.label);
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
                            handleInputChange(val.target.value, item.label);
                          }}
                        />
                      )}
                    </div>
                  ) : //</Form.Item>
                  item?.id !== 4 ? (
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
        </div>
        //<Form/>
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
                onClick={handleCancel}
              />
            }
            rightSection={
              <CustomButton
                //isBtnDisable={Object.keys(formErrors).length > 0}
                textStyle={styles.saveButtonTextStyles}
                btnText={intl.formatMessage({
                  id: "session.saveChanges",
                })}
                onClick={handleSave}
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
