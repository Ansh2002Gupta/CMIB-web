import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Select, Typography } from "antd";

import { Base, TwoColumn, TwoRow } from "../../../core/layouts";

import CustomButton from "../../../components/CustomButton";
import CustomGrid from "../../../components/CustomGrid";
import CustomInput from "../../../components/CustomInput";
import CustomLoader from "../../../components/CustomLoader";
import CustomSwitch from "../../../components/CustomSwitch";
import ErrorMessageBox from "../../../components/ErrorMessageBox/ErrorMessageBox";
import useAddNewCenterApi from "../../../services/api-services/Centers/useAddNewCenterApi";
import useFetch from "../../../core/hooks/useFetch";
import useNavigateScreen from "../../../core/hooks/useNavigateScreen";
import useResponsive from "../../../core/hooks/useResponsive";
import useShowNotification from "../../../core/hooks/useShowNotification";
import useUpdateCenterDetailsApi from "../../../services/api-services/Centers/useUpdateCenterDetailsApi";
import { CENTRE_END_POINT, ADMIN_ROUTE } from "../../../constant/apiEndpoints";
import { CONFIGURE_CENTRES } from "../../../routes/routeNames";
import { FIELDS } from "./configureCentreDetailsFields";
import { INITIAL_CENTRE_DETAILS } from "../../../dummyData";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import { classes } from "./ConfigureCentreDetails.styles";
import styles from "./ConfigureCentreDetails.module.scss";
import "./override.css";

const ConfigureCentreDetails = () => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_CENTRE_DETAILS);

  const { centreId } = useParams();
  const { data, error, fetchData, isLoading, isError } = useFetch({
    url:
      ADMIN_ROUTE +
      `/${currentlySelectedModuleKey}` +
      CENTRE_END_POINT +
      `/${centreId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { isLoading: isUpdatingCenterDetails, updateCenterDetails } =
    useUpdateCenterDetailsApi();

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { isLoading: isAddingCentre, addNewCenter } = useAddNewCenterApi();

  const isAddBtnDisable =
    !formData?.centre_code ||
    !formData?.centre_name ||
    !formData?.centre_type ||
    Object.values(formErrors).join("").length > 0;

  const fields = FIELDS(
    formData?.centre_name,
    formData?.centre_type,
    formData?.centre_code
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
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
    }

    return "";
  };

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const handleCancel = () => {
    navigate(`/${selectedModule?.key}/${CONFIGURE_CENTRES}`);
  };

  const handleSave = () => {
    const payload = {
      name: formData.centre_name,
      centre_code: formData.centre_code,
      centre_size: formData.centre_type,
      status: +formData.status,
    };
    if (!centreId) {
      addNewCenter(
        currentlySelectedModuleKey,
        payload,
        () => {
          navigate(`/${selectedModule?.key}/${CONFIGURE_CENTRES}`);
        },
        (errorMessage) => {
          showNotification({ text: errorMessage, type: "error" });
        }
      );
    } else {
      updateCenterDetails(
        centreId,
        currentlySelectedModuleKey,
        payload,
        () => {
          navigate(`/${selectedModule?.key}/${CONFIGURE_CENTRES}`);
        },
        (errorMessage) => {
          showNotification({ text: errorMessage, type: "error" });
        }
      );
    }
  };

  const handleTryAgain = () => {
    if (centreId) {
      fetchData({});
    }
  };

  useEffect(() => {
    if (centreId && userProfileDetails?.selectedModuleItem?.key) {
      fetchData({});
    }
  }, [centreId, userProfileDetails]);

  useEffect(() => {
    if (centreId) {
      setFormData({
        centre_code: data?.centre_code,
        centre_name: data?.name,
        centre_type: data?.centre_size,
        status: data?.status,
      });
    }
  }, [data]);

  return (
    <>
      {isError && (
        <div className={styles.box}>
          <ErrorMessageBox
            onClick={handleTryAgain}
            errorText={errorString}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {!isError && (
        <>
          {notificationContextHolder}
          {(isAddingCentre ||
            isUpdatingCenterDetails ||
            isUpdatingCenterDetails ||
            isLoading) && <CustomLoader />}
          {!isAddingCentre &&
            !isUpdatingCenterDetails &&
            !isUpdatingCenterDetails &&
            !isLoading && (
              <TwoRow
                className={styles.mainContainer}
                topSectionStyle={classes.mainTopSection}
                topSection={
                  <TwoRow
                    className={styles.centreDetails}
                    isBottomFillSpace
                    topSection={
                      <Base className={styles.headerContainer}>
                        <Typography className={styles.headingText}>
                          {intl.formatMessage({ id: "label.centreDetails" })}
                        </Typography>
                      </Base>
                    }
                    bottomSection={
                      <TwoRow
                        className={styles.centreFormBox}
                        topSection={
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
                                      disabled={!data?.is_editable}
                                      size={"large"}
                                      style={
                                        data?.is_editable
                                          ? classes.selectStyle
                                          : classes.inactiveSelectStyle
                                      }
                                      className={styles.selectInput}
                                      onChange={(val) =>
                                        handleInputChange(val, item.label)
                                      }
                                      options={item.selectOptions}
                                      placeholder={intl.formatMessage({
                                        id: `centre.placeholder.${item.headingIntl}`,
                                      })}
                                      value={item.value}
                                    />
                                  ) : (
                                    <div className={styles.formInputStyles}>
                                      <CustomInput
                                        disabled={
                                          item?.id === 3
                                            ? false
                                            : !data?.is_editable
                                        }
                                        value={item.value}
                                        customLabelStyles={styles.inputLabel}
                                        customInputStyles={styles.input}
                                        customContainerStyles={
                                          styles.customContainerStyles
                                        }
                                        onChange={(val) =>
                                          handleInputChange(
                                            val.target.value,
                                            item.label
                                          )
                                        }
                                        placeholder={intl.formatMessage({
                                          id: `centre.placeholder.${item.headingIntl}`,
                                        })}
                                      />
                                      {formErrors[item.label] && (
                                        <Typography
                                          className={styles.errorText}
                                        >
                                          {formErrors[item.label]}
                                        </Typography>
                                      )}
                                    </div>
                                  )
                                }
                              />
                            ))}
                            <CustomSwitch
                              checked={Boolean(formData?.status)}
                              disabled={!data?.is_editable}
                              label={intl.formatMessage({ id: "label.status" })}
                              onChange={() => {
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    status: !prev.status,
                                  };
                                });
                              }}
                              activeText={"active"}
                              inActiveText={"inactive"}
                            />
                          </CustomGrid>
                        }
                        bottomSection={
                          !data?.is_editable ? (
                            <Typography className={styles.noteText}>
                              {intl.formatMessage({
                                id: "centre.editCentreNote",
                              })}
                            </Typography>
                          ) : (
                            <></>
                          )
                        }
                      />
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
                          id: `label.${centreId ? "saveChanges" : "add"}`,
                        })}
                        onClick={handleSave}
                        isBtnDisable={isAddBtnDisable}
                      />
                    }
                  />
                }
                bottomSectionStyle={classes.bottomSectionStyle}
              />
            )}
        </>
      )}
    </>
  );
};

export default ConfigureCentreDetails;
