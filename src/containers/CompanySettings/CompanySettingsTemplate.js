import React from "react";
import { Typography } from "antd";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import SearchableDropDown from "../../components/SearchableDropDown";
import { TwoRow } from "../../core/layouts";
import { SESSION_PERIOD } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
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
      className={commonStyles.mainContainer}
      topSection={
        <Typography className={styles.heading}>
          {intl.formatMessage({ id: "label.for_company" })}
        </Typography>
      }
      bottomSection={
        <CustomGrid customStyle={commonStyles.customGridStyle}>
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
                    controls={item.hasControls}
                    type={"inputNumber"}
                    disabled={item.rules.isDisabled}
                    value={item.value}
                    customLabelStyles={styles.inputLabel}
                    customInputNumberStyles={styles.input}
                    customContainerStyles={styles.customContainerStyles}
                    maxLength={item.rules.maxLength}
                    onChange={(val) => {
                      handleInputChange(val, item.label);
                    }}
                    placeholder={intl.formatMessage({
                      id: `session.placeholder.${item.headingIntl}`,
                    })}
                    isError={!!formErrors[item.label]}
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
