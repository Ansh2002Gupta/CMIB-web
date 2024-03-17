import React from "react";
import { Typography } from "antd";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import SearchableDropDown from "../../components/SearchableDropDown";
import { TwoRow } from "../../core/layouts";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import {
  MAX_REGISTRATION_FEE_LENGTH,
  SESSION_PERIOD,
} from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./PaymentSettings.module.scss";

const PaymentSettingsTemplate = ({
  fields,
  formErrors,
  handleInputChange,
  intl,
  onRemoveCompanyItem,
  onSelectCompanyItem,
  selectedCompanyList,
}) => {
  return (
    <TwoRow
      className={commonStyles.mainContainer}
      topSection={
        <Typography className={styles.heading}>
          {intl.formatMessage({ id: "session.paymentSettings" })}
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
                      id: `session.payment.${item.headingIntl}`,
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
                    isRequiredField={true}
                    onSelectItem={onSelectCompanyItem}
                    onRemoveItem={onRemoveCompanyItem}
                    options={SESSION_PERIOD}
                    selectedOptionsList={selectedCompanyList}
                    placeholderText={`session.placeholder.${item.headingIntl}`}
                    title={`session.payment.${item.headingIntl}`}
                  />
                ) : (
                  <CustomInput
                    value={item.value}
                    customLabelStyles={styles.inputLabel}
                    customInputStyles={styles.input}
                    customContainerStyles={styles.customContainerStyles}
                    onChange={(val) => {
                      (item.rules.isPercentage
                        ? val.target.value <= 100
                        : val.target.value.length <=
                          MAX_REGISTRATION_FEE_LENGTH) &&
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

export default PaymentSettingsTemplate;
