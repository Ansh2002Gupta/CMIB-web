import React from "react";
import { Typography } from "antd";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import SearchableDropDown from "../../components/SearchableDropDown";
import { TwoRow } from "../../core/layouts";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { SESSION_PERIOD } from "../../constant/constant";
import styles from "./CompanySettings.module.scss";

const CompanySettingsTemplate = ({
  fields,
  formErrors,
  handleInputChange,
  intl,
  onRemoveInterviewType,
  onSelectInterviewType,
  selectedInterviewType,
}) => {
  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <Typography className={styles.heading}>
          {intl.formatMessage({ id: "label.for_company" })}
        </Typography>
      }
      bottomSection={
        <CustomGrid customStyle={styles.customGridStyle}>
          {fields?.map((item) => (
            <TwoRow
              key={item.id}
              className={
                item.isMultiSelect ? styles.gridDropdownItem : styles.gridItem
              }
              topSection={
                !item.isMultiSelect && (
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `label.${item.headingIntl}`,
                    })}
                    {item.rules.isRequired && (
                      <span className={styles.redText}> *</span>
                    )}
                  </Typography>
                )
              }
              bottomSection={
                item.isMultiSelect ? (
                  <SearchableDropDown
                    errorMessage={
                      formErrors[item.label] ? "label.error.fieldEmpty" : ""
                    }
                    isRequiredField
                    onSelectItem={onSelectInterviewType}
                    onRemoveItem={onRemoveInterviewType}
                    options={SESSION_PERIOD}
                    selectedOptionsList={selectedInterviewType}
                    placeholderText={`session.placeholder.${item.headingIntl}`}
                    title={`label.${item.headingIntl}`}
                  />
                ) : (
                  <CustomInput
                    disabled={item.rules.isDisabled}
                    value={item.value}
                    customLabelStyles={styles.inputLabel}
                    customInputStyles={styles.input}
                    customContainerStyles={styles.customContainerStyles}
                    maxLength={item.rules.maxLength}
                    onChange={(val) => {
                      (NUMERIC_VALUE_REGEX.test(val.target.value) ||
                        val.target.value === "") &&
                        handleInputChange(val.target.value, item.label);
                    }}
                    placeholder={intl.formatMessage({
                      id: `session.placeholder.${item.headingIntl}`,
                    })}
                    isError={formErrors[item.label]}
                    errorMessage={
                      formErrors[item.label]
                        ? intl.formatMessage({
                            id: `label.error.${formErrors[item.label]}`,
                          })
                        : ""
                    }
                  />
                )
              }
            />
          ))}
        </CustomGrid>
      }
    />
  );
};

export default CompanySettingsTemplate;
