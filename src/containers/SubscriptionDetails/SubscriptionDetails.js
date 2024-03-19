import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import { Typography } from "antd";

import { ThreeColumn, TwoColumn, TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import CustomButton from "../../components/CustomButton";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomInput from "../../components/CustomInput";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ContentHeader from "../ContentHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import SubscriptionDetailsCard from "../SubscriptionDetailsCard/SubscriptionDetailsCard";
import LabelWithValue from "../../components/LabelWithValue/LabelWithValue";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useFetch from "../../core/hooks/useFetch";
import { usePatch, usePost } from "../../core/hooks/useApiRequest";
import useShowNotification from "../../core/hooks/useShowNotification";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import {
  ADMIN_ROUTE,
  SUBSCRIPTIONS_END_POINT,
} from "../../constant/apiEndpoints";
import { ADD_SUBSCRIPTIONS, SUBSCRIPTIONS } from "../../routes/routeNames";
import {
  NOTIFICATION_TYPES,
  VALUE_ONE,
  VALUE_ZERO,
} from "../../constant/constant";
import { ReactComponent as Edit } from "../../themes/base/assets/images/edit.svg";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./SubscriptionDetails.module.scss";

const SubscriptionDetails = () => {
  const intl = useIntl();
  const { subscriptionId } = useParams();
  const location = useLocation();
  const { isLoading: isSubscriptionAdding, makeRequest: addSubscriptionData } =
    usePost({ url: ADMIN_ROUTE + SUBSCRIPTIONS_END_POINT });

  const {
    isLoading: isSubscriptionEditing,
    makeRequest: editSubscriptionData,
  } = usePatch({
    url: ADMIN_ROUTE + SUBSCRIPTIONS_END_POINT + `/${subscriptionId}`,
  });
  const {
    data: subscriptionData,
    error: subscriptionError,
    fetchData: getSubscriptionData,
    isError: errorWhileGttingSubscription,
    isLoading: isGettingSubscription,
  } = useFetch({
    url: ADMIN_ROUTE + SUBSCRIPTIONS_END_POINT + `/${subscriptionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const isAddSubscription = location.pathname.includes(ADD_SUBSCRIPTIONS);
  const [isEditPackage, setIsEditPackage] = useState(false);
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [, setNotificationStateDispatch] = useContext(NotificationContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const [status, setStatus] = useState(subscriptionData?.status);
  const [formData, setFormData] = useState(
    isAddSubscription
      ? {
          name: "",
          description: "",
          validity: null,
          price: null,
        }
      : {
          name: "sdcds",
          description: "dsfdsf",
          validity: 122,
          price: 213123,
        }
  );

  const [errors, setErrors] = useState([]);

  const navigateBackToSubscriptionListing = () => {
    navigate(`/${currentlySelectedModuleKey}/${SUBSCRIPTIONS}`, {
      replace: true,
    });
  };

  const handleRadioButton = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleError = (error, name) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validate = () => {
    let errorCount = 0;
    if (!formData?.name) {
      handleError(intl.formatMessage({ id: "label.error.fieldEmpty" }), "name");
      errorCount++;
    }
    if (!formData?.description) {
      handleError(
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        "description"
      );
      errorCount++;
    }
    if (!formData?.validity) {
      handleError(
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        "validity"
      );
      errorCount++;
    }
    if (!formData?.price) {
      handleError(
        intl.formatMessage({ id: "label.error.fieldEmpty" }),
        "price"
      );
      errorCount++;
    }
    if (errorCount) return false;
    else return true;
  };

  const handleInputChange = (value, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (!value) {
      handleError(intl.formatMessage({ id: "label.error.fieldEmpty" }), name);
      return;
    }
    handleError("", name);
  };

  const handleCancelBtnClick = () => {
    navigateBackToSubscriptionListing();
  };

  const addSubscription = () => {
    if (validate()) {
      addSubscriptionData({
        body: formData,
        onErrorCallback: (errorMessage) => {
          showNotification({
            text: errorMessage,
            type: NOTIFICATION_TYPES.ERROR,
            headingText: intl.formatMessage({ id: "label.error" }),
          });
        },
        onSuccessCallback: () => {
          setNotificationStateDispatch(
            setShowSuccessNotification({ isEdited: false, isAdded: true })
          );
          navigateBackToSubscriptionListing();
        },
      });
    }
  };

  const handleTryAgain = () => {
    getSubscriptionData({});
  };

  const editSubscription = () => {
    if (validate()) {
      editSubscriptionData({
        body: { status: status },
        onErrorCallback: (errorMessage) => {
          showNotification({
            text: errorMessage,
            type: NOTIFICATION_TYPES.ERROR,
            headingText: intl.formatMessage({ id: "label.error" }),
          });
        },
        onSuccessCallback: () => {
          setNotificationStateDispatch(
            setShowSuccessNotification({ isEdited: true, isAdded: false })
          );
          navigateBackToSubscriptionListing();
        },
      });
    }
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
                subHeading={!!formData.name ? formData.name : "-"}
                isMandatory
              />
            }
            bottomSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.package_validity_period",
                })}
                subHeading={
                  formData.validity ? formData.validity + " " + "Days" : "-"
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
                subHeading={formData.description ? formData.description : "-"}
              />
            }
            bottomSection={
              <LabelWithValue
                heading={intl.formatMessage({
                  id: "label.price",
                })}
                subHeading={formData?.price ? formData?.price : "-"}
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
                subHeading={
                  status
                    ? intl.formatMessage({ id: "label.active" })
                    : intl.formatMessage({ id: "label.inactive" })
                }
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
                disabled={!isAddSubscription && isEditPackage}
                errorMessage={errors?.name}
                isError={errors?.name ? true : false}
                value={formData.name}
                label={intl.formatMessage({
                  id: "label.packageName",
                })}
                isRequired
                type="text"
                customLabelStyles={styles.customLabelStyles}
                onChange={(e) => handleInputChange(e.target.value, "name")}
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename",
                })}
                customInputStyles={styles.customInputStyles}
              />
            }
            isRightFillSpace
            rightSection={
              <CustomInput
                disabled={!isAddSubscription && isEditPackage}
                errorMessage={errors?.description}
                isError={errors?.description ? true : false}
                value={formData?.description}
                label={intl.formatMessage({
                  id: "label.packageName_descriptions",
                })}
                isRequired
                type="text"
                customLabelStyles={styles.customLabelStyles}
                onChange={(e) =>
                  handleInputChange(e.target.value, "description")
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
                disabled={!isAddSubscription && isEditPackage}
                errorMessage={errors?.validity}
                isError={errors?.validity ? true : false}
                controls
                type="inputNumber"
                value={formData.validity}
                label={intl.formatMessage({
                  id: "label.package_valididy_period",
                })}
                isRequired
                customLabelStyles={styles.customLabelStyles}
                onChange={(val) => handleInputChange(val, "validity")}
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename_valididy_period",
                })}
                customInputNumberStyles={styles.customInputNumberStyles}
                errorInput={commonStyles.errorInput}
              />
            }
            middleSection={
              <CustomInput
                disabled={!isAddSubscription && isEditPackage}
                errorMessage={errors?.price}
                isError={errors?.price ? true : false}
                controls
                value={formData.price}
                label={intl.formatMessage({
                  id: "label.price",
                })}
                type="inputNumber"
                isRequired
                customLabelStyles={styles.customLabelStyles}
                onChange={(val) => handleInputChange(val, "price")}
                placeholder={intl.formatMessage({
                  id: "label.enterpackagename_price",
                })}
                customInputNumberStyles={styles.customInputNumberStyles}
                errorInput={commonStyles.errorInput}
              />
            }
            rightSection={
              !isAddSubscription && (
                <div className={styles.radioButtonMainContainer}>
                  <Typography className={styles.customLabelStyles}>
                    {intl.formatMessage({
                      id: "label.subscription_status",
                    })}
                  </Typography>
                  <div className={styles.radioButtonContainer}>
                    <CustomRadioButton
                      checked={status === VALUE_ONE}
                      label={intl.formatMessage({
                        id: "label.active",
                      })}
                      onChange={handleRadioButton}
                      value={VALUE_ONE}
                    />
                    <CustomRadioButton
                      checked={status === VALUE_ZERO}
                      label={intl.formatMessage({
                        id: "label.inactive",
                      })}
                      onChange={handleRadioButton}
                      value={VALUE_ZERO}
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
    <>
      {notificationContextHolder}
      <TwoRow
        topSection={
          <ContentHeader
            customContainerStyle={commonStyles.headerBox}
            headerText={
              (isEditPackage &&
                !isAddSubscription &&
                `Edit ${
                  formData.name ||
                  intl.formatMessage({ id: "label.default_package_name" })
                }`) ||
              (isAddSubscription &&
                intl.formatMessage({
                  id: "label.path.add-subscriptions",
                })) ||
              formData.name ||
              intl.formatMessage({ id: "label.default_package_name" })
            }
            rightSection={
              !isEditPackage && !isAddSubscription && renderEditButton()
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
                  isSubscriptionEditing ||
                  isSubscriptionAdding ||
                  isGettingSubscription ? (
                    <CustomLoader />
                  ) : isAddSubscription || isEditPackage ? (
                    renderEditableContent()
                  ) : errorWhileGttingSubscription ? (
                    <div className={styles.box}>
                      <ErrorMessageBox
                        onRetry={handleTryAgain}
                        errorText={
                          subscriptionError?.data?.message || subscriptionError
                        }
                        errorHeading={intl.formatMessage({ id: "label.error" })}
                      />
                    </div>
                  ) : (
                    renderNonEditableContent()
                  )
                }
              />
            }
            bottomSection={
              isAddSubscription || isEditPackage ? (
                <ActionAndCancelButtons
                  cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                  actionBtnText={intl.formatMessage({
                    id: isAddSubscription ? "label.add" : "label.save",
                  })}
                  onCancelBtnClick={handleCancelBtnClick}
                  onActionBtnClick={
                    isAddSubscription ? addSubscription : editSubscription
                  }
                  isActionBtnDisable={
                    !formData?.name ||
                    !formData?.description ||
                    !formData?.price ||
                    !formData?.validity
                  }
                />
              ) : null
            }
          />
        }
      />
    </>
  );
};

export default SubscriptionDetails;
