import React from "react";
import { Typography } from "antd";
import { capitalize } from "lodash";

import CustomGrid from "../../components/CustomGrid";
import CustomInput from "../../components/CustomInput";
import SearchableDropDown from "../../components/SearchableDropDown";
import { TwoRow } from "../../core/layouts";
import { COMPANY_INTERVIEW_TYPE } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./CompanySettings.module.scss";

const CompanySettingsTemplate = ({
  fields,
  formErrors,
  handleInputChange,
  intl,
  isEditable,
  onRemoveInterviewType,
  onSelectInterviewType,
  selectedInterviewType,
}) => {
  const renderBottomSection = (item) => {
    if (!isEditable) {
      if (item.isMultiSelect) {
        return (
          <div className={commonStyles.chipMainContainer}>
            {item?.value?.map((interviewType, index) => (
              <div className={commonStyles.chipContainer} key={index}>
                <Typography className={commonStyles.chipText}>
                  {capitalize(interviewType)}
                </Typography>
              </div>
            ))}
          </div>
        );
      }
      return <Typography className={styles.valueText}>{item.value}</Typography>;
    }

    if (item.isMultiSelect) {
      return (
        <SearchableDropDown
          errorMessage={
            formErrors[item.label]
              ? intl.formatMessage({ id: "label.error.fieldEmpty" })
              : ""
          }
          isRequiredField={item.rules.isRequired}
          onSelectItem={onSelectInterviewType}
          onRemoveItem={onRemoveInterviewType}
          options={COMPANY_INTERVIEW_TYPE}
          selectedOptionsList={selectedInterviewType}
          placeholderText={intl.formatMessage({
            id: `session.placeholder.${item.headingIntl}`,
          })}
          title={intl.formatMessage({ id: `label.${item.headingIntl}` })}
        />
      );
    }

    return (
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
    );
  };

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
                !(isEditable && item.isMultiSelect) && (
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
              bottomSection={renderBottomSection(item)}
            />
          ))}
        </CustomGrid>
      }
    />
  );
};

export default CompanySettingsTemplate;
