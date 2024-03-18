import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { ThreeColumn, TwoColumn, TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CustomButton from "../../components/CustomButton";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomInput from "../../components/CustomInput";
import ContentHeader from "../ContentHeader";
import SubscriptionDetailsCard from "../SubscriptionDetailsCard/SubscriptionDetailsCard";
import LabelWithValue from "../../components/LabelWithValue/LabelWithValue";
import { VALUE_ONE, VALUE_TWO, VALUE_ZERO } from "../../constant/constant";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { ADD_SUBSCRIPTIONS, SUBSCRIPTIONS } from "../../routes/routeNames";
import { ReactComponent as Edit } from "../../themes/base/assets/images/edit.svg";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./SubscriptionDetails.module.scss";

const SubscriptionDetails = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  //TODO: LINKING WITH THE MANAGE SUBSCRIPTION > LISTING

  /**

   INFO: Manually set
   *  isAddSubscription->true and isEditPackage->false FOR ADD SUBSCRIPTION
   * isAddSubscription->false and isEditPackage->true FOR NON-EDITABLE PACKAGE DISCRIPTION

   **/
  const [isAddSubscription, setIsAddSubscription] = useState(false);
  const [isEditPackage, setIsEditPackage] = useState(true);

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

  const handleCancelBtnClick = () => {
    navigate(`/${currentlySelectedModuleKey}/${SUBSCRIPTIONS}`);
  };

  const renderNonEditableContent = () => {
    return (
      <ThreeColumn
        leftSection={
          <TwoRow
            className={styles.upperContainer}
            topSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.packageName",
                })}
                subHeading={
                  !!formData.packageName ? formData.packageName : "Package 1"
                }
                isMandatory
              />
            }
            bottomSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.package_validity_period",
                })}
                subHeading={
                  formData.packageValidityPeriod
                    ? formData.packageValidityPeriod + " " + "Days"
                    : "30 Days"
                }
                isMandatory
              />
            }
          />
        }
        middleSection={
          <TwoRow
            className={styles.upperContainer}
            topSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.packageName_descriptions",
                })}
                subHeading={
                  formData.packageDescription
                    ? formData.packageDescription
                    : "Package Description"
                }
              />
            }
            bottomSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.price",
                })}
                subHeading={
                  formData.packagePrice ? formData.packagePrice : "1000 INR"
                }
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
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.subscription_status",
                })}
                //TODO: SET A STATE FOR ACTIVE/INACTIVE SUBSCRIPTION.
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
                  id: "label.packageName_descriptions",
                })}
                isRequired
                type="text"
                customLabelStyles={styles.customLabelStyles}
                onChange={(e) =>
                  handleInputChange(e.target.value, "packageDescription")
                }
                placeholder={intl.formatMessage({
                  id: "label.packageName_descriptions",
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
              isEditPackage && (
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
              )
            }
            isLeftFillSpace
            isMiddleFillSpace
            isRightFillSpace
          />
        }
      />
    );
  };

  const editPackage = () => {
    setIsAddSubscription(true);
    setIsEditPackage(true);
  };

  const renderEditButton = () => {
    return (
      <CustomButton
        textStyle={styles.editButtonTitle}
        IconElement={Edit}
        btnText={intl.formatMessage({ id: "label.edit" })}
        withWhiteBackground
        onClick={editPackage}
      />
    );
  };

  return (
    <TwoRow
      topSection={
        <ContentHeader
          customContainerStyle={commonStyles.headerBox}
          headerText={
            (isEditPackage &&
              !isAddSubscription &&
              // For now we using hardcoded heading When we'll implement API we use that value then
              intl.formatMessage({ id: "label.default_package_name" })) ||
            (!isEditPackage &&
              isAddSubscription &&
              intl.formatMessage({
                id: "label.path.add-subscriptions",
              })) ||
            `Edit ${intl.formatMessage({ id: "label.default_package_name" })}`
          }
          rightSection={
            (!isAddSubscription || isEditPackage) && renderEditButton()
          }
        />
      }
      isBottomFillSpace
      bottomSection={
        <TwoRow
          className={styles.container}
          isTopFillSpace={isAddSubscription}
          topSection={
            <SubscriptionDetailsCard
              heading={intl.formatMessage({
                id: "label.subscriptions_details",
              })}
              content={
                isAddSubscription
                  ? renderEditableContent()
                  : renderNonEditableContent()
              }
            />
          }
          bottomSection={
            isAddSubscription ? (
              <ActionAndCancelButtons
                cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                actionBtnText={intl.formatMessage({ id: "label.add" })}
                onCancelBtnClick={handleCancelBtnClick}
                onActionBtnClick={() => {}}
              />
            ) : null
          }
        />
      }
    />
  );
};

export default SubscriptionDetails;
