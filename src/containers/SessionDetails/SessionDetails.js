import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Typography, Image, Switch } from "antd";

import { TwoRow, TwoColumn, ThreeRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import variables from "../../themes/base/styles/variables";
import styles from "./SessionDetails.module.scss";

const SessionDetails = () => {
  const intl = useIntl();
  const [status, setStatus] = useState(true);
  const [edit, setEdit] = useState(false);
  const { getImage } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    sessionName: "Campus Placement Programme",
    natureOfGoods: "Services/goods",
    invoiceNumberFormat: "Augsept-***-2023",
    examinationSessionPeriod: "May 2023",
    gmcsCompletetionDate: "10/10/2022",
    membershipCompletetionDate: "10/10/2022",
    articleshipCompletetionFromDate: "10/10/2022",
    articleshipCompletetionToDate: "10/10/2022",
    bankACNumberOffline: "1233 9344 0234 0234",
    bankACNumberOnline: "1233 9344 0234 0234",
  });
  const FIELDSONE = [
    {
      id: 1,
      headingIntl: "sessionName",
      headingLabel: "Session Name *",
      value: formData.sessionName,
    },
    {
      id: 2,
      headingIntl: "natureOfGoods",
      headingLabel: "Nature of services/goods *",
      value: formData.natureOfGoods,
    },
    {
      id: 3,
      headingIntl: "invoiceNumberFormat",
      headingLabel: "Perfoma Invoice Number Format *",
      value: formData.invoiceNumberFormat,
    },
    {
      id: 4,
      headingIntl: "examinationSessionPeriod",
      headingLabel: "Examination Session Period *",
      value: formData.examinationSessionPeriod,
    },
    {
      id: 5,
      headingIntl: "gmcsCompletetionDate",
      headingLabel: "GMCS Completetion Date *",
      value: formData.gmcsCompletetionDate,
    },
    {
      id: 6,
      headingIntl: "membershipCompletetionDate",
      headingLabel: "Membership Completetion Date *",
      value: formData.membershipCompletetionDate,
    },
    {
      id: 7,
      headingIntl: "articleshipCompletetionFromDate",
      headingLabel: "Articleship Completetion From Date *",
      value: formData.articleshipCompletetionFromDate,
    },
    {
      id: 8,
      headingIntl: "articleshipCompletetionToDate",
      headingLabel: "Articleship Completetion To Date`*",
      value: formData.articleshipCompletetionToDate,
    },
    {
      id: 9,
      headingIntl: "bankACNumberOffline",
      headingLabel: "Bank A/C number offline *",
      value: formData.bankACNumberOffline,
    },
    {
      id: 10,
      headingIntl: "bankACNumberOnline",
      headingLabel: "Bank A/C number online*",
      value: formData.bankACNumberOnline,
    },
  ];

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
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
        <div className={styles.gridContainer}>
          {FIELDSONE.map((item) => {
            return (
              <TwoRow
                key={item.id}
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({ id: `session.${item.headingIntl}` })}
                    <span className={styles.redText}>*</span>
                  </Typography>
                }
                bottomSection={
                  edit ? (
                    <CustomInput
                      value={item.value}
                      disabled={!edit}
                      customLabelStyles={styles.inputLabel}
                      customInputStyles={styles.input}
                      onChange={(val) => {
                        handleInputChange(val.target.value, item.headingIntl);
                      }}
                    />
                  ) : (
                    <Typography className={styles.blackText}>
                      {item.value}
                    </Typography>
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
                    style={status && { backgroundColor: variables.greenBtnBg }}
                    checked={status}
                    onChange={() => {
                      setStatus(!status);
                    }}
                    disabled={!edit}
                  />
                }
                rightSection={
                  <Typography className={styles.blackText}>
                    {intl.formatMessage({
                      id: `label.${status ? "active" : "inactive"}`,
                    })}
                  </Typography>
                }
              />
            }
          />
        </div>
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
                customStyle={styles.buttonStyles}
                textStyle={styles.textStyle}
                onClick={() => {
                  setEdit(false);
                }}
              />
            }
            rightSection={
              <CustomButton
                btnText={intl.formatMessage({
                  id: "session.saveChanges",
                })}
              />
            }
          />
        )
      }
      bottomSectionStyle={{ alignSelf: "flex-end" }}
    />
  );
};
export default SessionDetails;
