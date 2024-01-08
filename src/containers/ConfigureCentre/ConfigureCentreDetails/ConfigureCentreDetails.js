import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Select, Switch, Typography } from "antd";

import { Base, TwoColumn, TwoRow } from "../../../core/layouts";

import CustomButton from "../../../components/CustomButton";
import CustomGrid from "../../../components/CustomGrid";
import CustomInput from "../../../components/CustomInput";
import useResponsive from "../../../core/hooks/useResponsive";
import { FIELDS } from "./configureCentreDetailsFields";
import { INITIAL_CENTRE_DETAILS } from "../../../dummyData";
import { classes } from "./ConfigureCentreDetails.styles";
import styles from "./ConfigureCentreDetails.module.scss";

const ConfigureCentreDetails = () => {
  const intl = useIntl();
  const responsive = useResponsive();

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_CENTRE_DETAILS);

  const fields = FIELDS(
    formData?.centreName,
    formData?.bigSmallCentre,
    formData?.centreId
  );

  const handleInputChange = (value, name) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    const fieldRules = fields.find((field) => field.label === name)?.rules;
    const error = validateField(value, fieldRules);
    setFormErrors((prev) => {
      return {
        ...prev,
        [name]: error,
      };
    });
  };

  const validateField = (value, rules) => {
    for (const rule of rules) {
      if (rule.required && (!value || value.length <= 0)) {
        return rule.message;
      }
    }

    return "";
  };

  const handleCancel = () => {
    setFormData(INITIAL_CENTRE_DETAILS);
    setFormErrors({});
  };

  const handleSave = () => {};

  return (
    <TwoRow
      className={styles.mainContainer}
      topSectionStyle={classes.mainTopSection}
      topSection={
        <TwoRow
          className={styles.centreDetails}
          topSection={
            <Base className={styles.headerContainer}>
              <Typography className={styles.headingText}>
                {intl.formatMessage({ id: "label.centreDetails" })}
              </Typography>
            </Base>
          }
          bottomSection={
            <CustomGrid>
              {fields.map((item) => (
                <TwoRow
                  key={item.id}
                  className={styles.gridItem}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: `label.${item.headingIntl}`,
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    item.id === 2 ? (
                      <Select
                        bordered={false}
                        size={"large"}
                        style={classes.selectStyle}
                        className={styles.selectInput}
                        onChange={(val) => handleInputChange(val, item.label)}
                        options={item.selectOptions}
                        placeholder={intl.formatMessage({
                          id: `centre.placeholder.${item.headingIntl}`,
                        })}
                        value={item.value}
                      />
                    ) : (
                      <div className={styles.formInputStyles}>
                        <CustomInput
                          value={item.value}
                          customLabelStyles={styles.inputLabel}
                          customInputStyles={styles.input}
                          customContainerStyles={styles.customContainerStyles}
                          onChange={(val) =>
                            handleInputChange(val.target.value, item.label)
                          }
                          placeholder={intl.formatMessage({
                            id: `centre.placeholder.${item.headingIntl}`,
                          })}
                        />
                        {formErrors[item.label] && (
                          <Typography className={styles.errorText}>
                            {formErrors[item.label]}
                          </Typography>
                        )}
                      </div>
                    )
                  }
                />
              ))}
              <TwoRow
                className={styles.gridItem}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({ id: "label.status" })}
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
                      />
                    }
                    rightSection={
                      <Typography className={styles.blackText}>
                        {intl.formatMessage({
                          id: `label.${
                            formData?.status ? "active" : "inactive"
                          }`,
                        })}
                      </Typography>
                    }
                  />
                }
              />
            </CustomGrid>
          }
        />
      }
      bottomSection={
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
              textStyle={styles.saveButtonTextStyles}
              btnText={intl.formatMessage({
                id: "label.add",
              })}
              onClick={handleSave}
            />
          }
        />
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};

export default ConfigureCentreDetails;
