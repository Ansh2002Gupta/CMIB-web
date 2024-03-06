import React from "react";
import { Typography } from "antd";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import SearchableDropDown from "../../components/SearchableDropDown";
import { TwoRow } from "../../core/layouts";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { MAX_REGISTRATION_FEE_LENGTH, SESSION_PERIOD } from "../../constant/constant";
import { classes } from "./PaymentSettings.styles";
import styles from "./PaymentSettings.module.scss";

const PaymentSettingsTemplate = ({
  fields,
  formErrors,
  handleInputChange,
  intl,
  isButtonDisable,
  onClickCancel,
  onClickSave,
  onRemoveCompanyItem,
  onSelectCompanyItem,
  selectedCompanyList,
}) => {

  return (
    <TwoRow
      topSectionClassName={styles.mainContainer}
      topSection={
        <TwoRow
          className={styles.mainGap}
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
                  className={item.id === 4 ? styles.gridDropdownItem : styles.gridItem}
                  topSection={
                    item.id === 4 ? (
                      <></>
                    ) : (
                      <Typography className={styles.grayText}>
                        {intl.formatMessage({
                          id: `session.payment.${item.headingIntl}`,
                        })}
                        <span className={styles.redText}> *</span>
                      </Typography>
                    )
                  }
                  bottomSection={
                    item.id === 4 ? (
                      <SearchableDropDown
                        errorMessage={formErrors[item.label]
                            ? "label.error.fieldEmpty"
                            : ""}
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
                            (item.id !== 6 ? val.target.value <= 100 : val.target.value.length <= MAX_REGISTRATION_FEE_LENGTH) &&
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
      }
      bottomSection={
        <ActionAndCancelButtons
          actionBtnText={intl.formatMessage({
            id: "session.saveChanges",
          })}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          customActionBtnStyles={styles.button}
          customCancelBtnStyles={styles.button}
          onActionBtnClick={() => onClickSave()}
          isActionBtnDisable={isButtonDisable()}
          onCancelBtnClick={() => onClickCancel()}
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};

export default PaymentSettingsTemplate;
