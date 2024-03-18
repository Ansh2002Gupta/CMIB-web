import React from "react";
import { Typography } from "antd";
import { capitalize } from "lodash";

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
  isEditable,
  onRemoveCompanyItem,
  onSelectCompanyItem,
  selectedCompanyList,
}) => {
  const renderTopSection = (item) => {
    return (
      !(isEditable && item.isMultiSelect) && (
        <Typography className={styles.grayText}>
          {intl.formatMessage({
            id: `session.payment.${item.headingIntl}`,
          })}
          {item.rules.isRequired && <span className={styles.redText}> *</span>}
        </Typography>
      )
    );
  };

  const renderBottomSection = (item) => {
    if (!isEditable) {
      if (item.isMultiSelect) {
        return (
          <div className={commonStyles.chipMainContainer}>
            {item?.value?.map((company, index) => (
              <div className={commonStyles.chipContainer} key={index}>
                <Typography className={commonStyles.chipText}>
                  {capitalize(company)}
                </Typography>
              </div>
            ))}
          </div>
        );
      }
      return <Typography>{item.value}</Typography>;
    }
    if (item.isMultiSelect) {
      return (
        <SearchableDropDown
          errorMessage={formErrors[item.label] ? "label.error.fieldEmpty" : ""}
          isRequiredField={true}
          onSelectItem={onSelectCompanyItem}
          onRemoveItem={onRemoveCompanyItem}
          options={SESSION_PERIOD}
          selectedOptionsList={selectedCompanyList}
          placeholderText={`session.placeholder.${item.headingIntl}`}
          title={`session.payment.${item.headingIntl}`}
        />
      );
    }
    return (
      <CustomInput
        value={item.value}
        customLabelStyles={styles.inputLabel}
        customInputStyles={styles.input}
        customContainerStyles={styles.customContainerStyles}
        onChange={(val) => {
          const isValueValid = item.rules.isPercentage
            ? val.target.value <= 100
            : val.target.value.length <= MAX_REGISTRATION_FEE_LENGTH;
          const isNumericOrEmpty =
            NUMERIC_VALUE_REGEX.test(val.target.value) ||
            val.target.value === "";

          if (isValueValid && isNumericOrEmpty) {
            handleInputChange(val.target.value, item.label);
          }
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
    );
  };

  return (
    <TwoRow
      className={commonStyles.mainContainer}
      topSection={
        <Typography className={styles.heading}>
          {intl.formatMessage({ id: "session.paymentSettings" })}
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
              topSection={renderTopSection(item)}
              bottomSection={renderBottomSection(item)}
            />
          ))}
        </CustomGrid>
      }
    />
  );
};

export default PaymentSettingsTemplate;
