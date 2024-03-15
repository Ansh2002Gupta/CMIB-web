import React, { useState } from "react";
import { Typography } from "antd";
import { useIntl } from "react-intl";

import { ThreeColumn, TwoColumn, TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomInput from "../../components/CustomInput";
import ContentHeader from "../ContentHeader";
import SubscriptionDetailsCard from "../../components/SubscriptionDetailsCard/SubscriptionDetailsCard";
import RenderDetails from "../../components/RenderDetails/RenderDetails";
import { VALUE_ONE, VALUE_TWO, VALUE_ZERO } from "../../constant/constant";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./addSubscription.module.scss";

const AddSubscription = () => {
  const intl = useIntl();
  const isEdit = true;

  const [value, setValue] = useState(VALUE_ZERO);
  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    packageValidityPeriod: null,
    packagePrice: null,
  });
  const handleRadioButton = (e) => {
    setValue(e.target.value);
  };

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderNonEditableContent = () => {
    return (
      <ThreeColumn
        leftSection={
          <TwoRow
            className={styles.upperContainer}
            topSection={
              <RenderDetails
                heading={intl.formatMessage({
                  id: "label.packageName",
                })}
                subHeading={"Package 1"}
                isMandatory
              />
            }
            bottomSection={
              <RenderDetails
                heading={intl.formatMessage({
                  id: "label.package_valididy_period",
                })}
                subHeading={"Package 1"}
                isMandatory
              />
            }
          />
        }
        middleSection={
          <TwoRow
            className={styles.upperContainer}
            topSection={
              <RenderDetails
                heading={intl.formatMessage({
                  id: "label.packageName_discriptions",
                })}
                subHeading={"Package 1"}
              />
            }
            bottomSection={
              <RenderDetails
                heading={intl.formatMessage({
                  id: "label.price",
                })}
                subHeading={"Package 1"}
                isMandatory
              />
            }
          />
        }
        rightSection={
          <TwoRow
            className={styles.upperContainer}
            isTopFillSpace
            bottomSection={
              <RenderDetails
                heading={intl.formatMessage({
                  id: "label.subscription_status",
                })}
                subHeading={"Active"}
              />
            }
          />
        }
        isLeftFillSpace
        isMiddleFillSpace
        isRightFillSpace
      />
    );
  };

  const renderEditableContent = () => {
    return (
      <TwoRow
        className={styles.upperContainer}
        topSection={
          <TwoColumn
            className={styles.upperContainer}
            leftSection={
              <CustomInput
                value={formData.packageName}
                label={intl.formatMessage({
                  id: "label.packageName",
                })}
                isRequired
                type="text"
                customLabelStyles={styles.customLabelStyles}
                onChange={(e) =>
                  handleInputChange(e.target.value, "packageName")
                }
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename",
                })}
                customInputStyles={styles.customInputStyles}
              />
            }
            isRightFillSpace
            rightSection={
              <CustomInput
                value={formData.packageDescription}
                label={intl.formatMessage({
                  id: "label.packageName_discriptions",
                })}
                isRequired
                type="text"
                customLabelStyles={styles.customLabelStyles}
                onChange={(e) =>
                  handleInputChange(e.target.value, "packageDescription")
                }
                placeholder={intl.formatMessage({
                  id: "label.packageName_discriptions",
                })}
                customInputStyles={styles.customInputStyles}
              />
            }
          />
        }
        bottomSection={
          <ThreeColumn
            className={styles.bottomSection}
            leftSection={
              <CustomInput
                controls
                type="inputNumber"
                value={formData.packageValidityPeriod}
                label={intl.formatMessage({
                  id: "label.package_valididy_period",
                })}
                isRequired
                customLabelStyles={styles.customLabelStyles}
                onChange={(val) =>
                  handleInputChange(val, "packageValidityPeriod")
                }
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename_valididy_period",
                })}
                customInputNumberStyles={styles.customInputNumberStyles}
              />
            }
            middleSection={
              <CustomInput
                controls
                value={formData.packagePrice}
                label={intl.formatMessage({
                  id: "label.price",
                })}
                type="inputNumber"
                isRequired
                customLabelStyles={styles.customLabelStyles}
                onChange={(val) => handleInputChange(val, "packagePrice")}
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename_price",
                })}
                customInputNumberStyles={styles.customInputNumberStyles}
              />
            }
            rightSection={
              <div className={styles.radioButtonMainContainer}>
                <Typography className={styles.customLabelStyles}>
                  {intl.formatMessage({
                    id: "label.subscription_status",
                  })}
                </Typography>
                <div className={styles.radioButtonContainer}>
                  <CustomRadioButton
                    checked={value === VALUE_ONE}
                    label={intl.formatMessage({
                      id: "label.active",
                    })}
                    onChange={handleRadioButton}
                    value={VALUE_ONE}
                  />
                  <CustomRadioButton
                    checked={value === VALUE_TWO}
                    label={intl.formatMessage({
                      id: "label.inactive",
                    })}
                    onChange={handleRadioButton}
                    value={VALUE_TWO}
                  />
                </div>
              </div>
            }
            isLeftFillSpace
            isMiddleFillSpace
            isRightFillSpace
          />
        }
      />
    );
  };

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customContainerStyle={commonStyles.headerBox}
          headerText={intl.formatMessage({ id: "label.path.addSubscriptions" })}
        />
      }
      isBottomFillSpace
      bottomSection={
        <TwoRow
          className={styles.container}
          isTopFillSpace={isEdit}
          topSection={
            <SubscriptionDetailsCard
              heading={intl.formatMessage({
                id: "label.subscriptions_details",
              })}
              content={
                isEdit ? renderEditableContent() : renderNonEditableContent()
              }
            />
          }
          bottomSection={
            isEdit ? (
              <ActionAndCancelButtons
                cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                actionBtnText={intl.formatMessage({ id: "label.add" })}
              />
            ) : null
          }
        />
      }
    />
  );
};

export default AddSubscription;
