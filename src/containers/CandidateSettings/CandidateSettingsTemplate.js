import React from "react";
import dayjs from "dayjs";
import { Table, Typography } from "antd";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import { TwoRow } from "../../core/layouts";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { MAX_REGISTRATION_FEE_LENGTH } from "../../constant/constant";
import { classes } from "./CandidateSettings.styles";
import styles from "./CandidateSettings.module.scss";
import "./Override.css";

const CandidateSettingsTemplate = ({
  fields,
  formErrors,
  handleInputChange,
  intl,
  columns,
  tableData,
}) => {
  return (
    <div className={styles.mainContainer}>
      <Typography className={styles.heading}>
        {intl.formatMessage({ id: "session.candidateSettings" })}
      </Typography>
      <CustomGrid customStyle={styles.customGridStyle}>
        {fields &&
          fields[0].map((_, columnIndex) => (
            <div className={styles.column} key={columnIndex}>
              {fields.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                  <TwoRow
                    className={styles.gridItem}
                    topSection={
                      <Typography className={styles.grayText}>
                        {intl.formatMessage({
                          id: `label.${row[columnIndex].headingIntl}`,
                        })}
                        {row[columnIndex].rules.isRequired && (
                          <span className={styles.redText}> *</span>
                        )}
                      </Typography>
                    }
                    bottomSection={
                      row[columnIndex].isDateTimePicker ? (
                        <CustomDateTimePicker
                          customLabelStyles={styles.inputLabel}
                          customInputStyle={classes.inputStyle}
                          type="date"
                          onChange={(val) => {
                            handleInputChange(
                              val ? dayjs(val).format("YYYY-MM-DD") : "",
                              row[columnIndex].label
                            );
                          }}
                          placeholder={intl.formatMessage({
                            id: `placeholder.${row[columnIndex].headingIntl}`,
                          })}
                          value={row[columnIndex].value}
                          isEditable
                        />
                      ) : (
                        <CustomInput
                          value={row[columnIndex].value}
                          customLabelStyles={styles.inputLabel}
                          customInputStyles={styles.input}
                          customContainerStyles={styles.customContainerStyles}
                          onChange={(val) => {
                            val.target.value.length <=
                              MAX_REGISTRATION_FEE_LENGTH &&
                              (NUMERIC_VALUE_REGEX.test(val.target.value) ||
                                val.target.value === "") &&
                              handleInputChange(
                                val.target.value,
                                row[columnIndex].label
                              );
                          }}
                          placeholder={intl.formatMessage({
                            id: `placeholder.${row[columnIndex].headingIntl}`,
                          })}
                          isError={formErrors[row[columnIndex].label]}
                          errorMessage={
                            formErrors[row[columnIndex].label]
                              ? intl.formatMessage({
                                  id: `label.error.${
                                    formErrors[row[columnIndex].label]
                                  }`,
                                })
                              : ""
                          }
                        />
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
      </CustomGrid>
      <Typography className={styles.subHeadingStyle}>
        {intl.formatMessage({ id: "label.allow_consent_for_candidate" })}
      </Typography>
      <div className={styles.editContainer}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: "max-content" }}
          className={`customTable ${styles.customContainerStyles} customTableNoHover`}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default CandidateSettingsTemplate;
