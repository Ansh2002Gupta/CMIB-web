import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";
import useHeader from "../../core/hooks/useHeader";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import CustomInput from "../../components/CustomInput";
import PointsList from "../../components/PointsList";
import useChangePassword from "../../services/api-services/ChangePassword/useChangePassword";
import useShowNotification from "../../core/hooks/useShowNotification";
import { setShowChangePasswordModal } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  AT_LEAST_ONE_CAPITAL_LETTER,
  AT_LEAST_ONE_NUMERIC_VALUE,
  AT_LEAST_ONE_SMALL_LETTER,
  AT_LEAST_ONE_SPECIAL_CHARACTER,
  AT_LEAST_SIX_CHARACTERS_REGEX,
} from "../../constant/regex";
import { FIELDS } from "./changePasswordFields";
import { getPasswordStrengthPointsArray } from "../../constant/passwordRules";
import { INITIAL_PASSWORD_DATA } from "../../constant/constant";
import { classes } from "./ChangePassword.styles";
import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { onLogout } = useHeader();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const {
    errorWhileChangingPassword,
    handleChangePassword,
    isLoading,
    changePasswordApiStatus,
  } = useChangePassword();

  const initalShouldShowData = {
    old_password: false,
    new_password: false,
    confirm_password: false,
  };

  const [formData, setFormData] = useState(INITIAL_PASSWORD_DATA);
  const [passwordValidations, setPasswordValidation] = useState({
    oneNumericValue: false,
    oneCapitalLetterValue: false,
    oneSmallLetterValue: false,
    oneSpecialCharacterValue: false,
    atLeast6Characters: false,
    bothEqual: false,
  });
  const [isBulletColorRed, setIsBulletColorRed] = useState(false);
  const [shouldShow, setShouldShow] = useState(initalShouldShowData);

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const { showChangePasswordModal } = userProfileDetails;

  const fields = FIELDS(
    formData?.old_password,
    formData?.new_password,
    formData?.confirm_password
  );

  const passwordStrengthCheck = (newPassword, confirmPassword) => {
    setPasswordValidation({
      oneNumericValue: AT_LEAST_ONE_NUMERIC_VALUE.test(newPassword),
      oneCapitalLetterValue: AT_LEAST_ONE_CAPITAL_LETTER.test(newPassword),
      oneSmallLetterValue: AT_LEAST_ONE_SMALL_LETTER.test(newPassword),
      oneSpecialCharacterValue:
        AT_LEAST_ONE_SPECIAL_CHARACTER.test(newPassword),
      atLeast6Characters: AT_LEAST_SIX_CHARACTERS_REGEX.test(newPassword),
      bothEqual: newPassword === confirmPassword,
    });
  };

  const isSaveButtonDisabled = () => {
    return (
      !formData.old_password ||
      !formData.new_password ||
      !formData.confirm_password ||
      !passwordValidations.oneSmallLetterValue ||
      !passwordValidations.oneCapitalLetterValue ||
      !passwordValidations.oneNumericValue ||
      !passwordValidations.oneSpecialCharacterValue ||
      !passwordValidations.atLeast6Characters
    );
  };

  const passwordStrengthPointsArray = getPasswordStrengthPointsArray(
    intl,
    passwordValidations
  );

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setFormData(INITIAL_PASSWORD_DATA);
    setShouldShow(initalShouldShowData);
    setIsBulletColorRed(false);
    userProfileDispatch(setShowChangePasswordModal(false));
  };

  const handleOnBlur = () => {
    if (formData.new_password) {
      setIsBulletColorRed(true);
    } else {
      setIsBulletColorRed(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValidations.bothEqual) {
      showNotification(
        intl.formatMessage({
          id: "label.newPasswordAndConfirmPasswordDoNotMatched",
        }),
        "error"
      );
      return;
    }
    await handleChangePassword({
      current_password: formData.old_password,
      new_password: formData.new_password,
    });
  };

  useEffect(() => {
    passwordStrengthCheck(formData.new_password, formData.confirm_password);
  }, [formData.new_password, formData.confirm_password]);

  useEffect(() => {
    if (errorWhileChangingPassword) {
      showNotification(errorWhileChangingPassword, "error");
    }
  }, [errorWhileChangingPassword]);

  useEffect(() => {
    let timer;
    if (changePasswordApiStatus === "success") {
      showNotification(
        intl.formatMessage({
          id: "label.passwordChanged",
        }),
        "success"
      );
      timer = setTimeout(() => {
        return onLogout(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [changePasswordApiStatus]);

  return (
    <>
      {notificationContextHolder}
      <Modal
        className={styles.modal}
        footer={null}
        open={showChangePasswordModal}
        maskClosable={false}
        closeIcon={false}
        centered={true}
        width={530}
      >
        <Base className={styles.container}>
          <div className={styles.imageAndHeadingContainer}>
            <div className={styles.headingAndSubHeadingContainer}>
              <Typography className={styles.heading}>
                {intl.formatMessage({ id: "label.changePassword" })}
              </Typography>
              <div>
                <Image
                  src={getImage("cross")}
                  className={styles.crossIcon}
                  preview={false}
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          </div>
          <>
            {fields.map((item) => (
              <TwoRow
                key={item.id}
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `label.${item.headingIntl}`,
                    })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
                bottomSection={
                  <div className={styles.formInputStyles}>
                    <CustomInput
                      value={item.value}
                      type={shouldShow[item.label] ? "text" : "password"}
                      isSuffixRequiredForPassword
                      customLabelStyles={styles.inputLabel}
                      customInputStyles={styles.input}
                      customContainerStyles={styles.customContainerStyles}
                      onChange={(val) =>
                        handleInputChange(val.target.value, item.label)
                      }
                      onBlur={
                        item.label === "new_password" ? handleOnBlur : () => {}
                      }
                      placeholder={intl.formatMessage({
                        id: `label.${item.headingIntl}`,
                      })}
                      onSuffixElementClick={() =>
                        setShouldShow((prev) => {
                          return {
                            ...prev,
                            [item.label]: !prev[item.label],
                          };
                        })
                      }
                      isTextVisible={!shouldShow[item.label]}
                    />
                  </div>
                }
              />
            ))}
            <TwoRow
              className={styles.twoRowContainer}
              topSection={
                <PointsList
                  pointsArray={passwordStrengthPointsArray}
                  isBulletColorRed={isBulletColorRed}
                  pointsHeading={intl.formatMessage({
                    id: "label.passwordStrengthCheckHeading",
                  })}
                  customHeadingStyles={styles.passwordPointsHeading}
                />
              }
              bottomSectionStyle={classes.bottomSectionStyles}
              bottomSection={
                <ActionAndCancelButtons
                  customActionBtnStyles={styles.customActionBtnStyles}
                  customCancelBtnStyles={styles.customCancelBtnStyles}
                  actionBtnText={intl.formatMessage({
                    id: "label.save",
                  })}
                  cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                  onActionBtnClick={handleOnSubmit}
                  isActionBtnDisable={isSaveButtonDisabled() || isLoading}
                  onCancelBtnClick={handleCloseModal}
                  isctionButtonLoading={isLoading}
                />
              }
            />
          </>
        </Base>
      </Modal>
    </>
  );
};

export default ChangePassword;
