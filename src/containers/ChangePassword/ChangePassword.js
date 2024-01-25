import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import CustomInput from "../../components/CustomInput";
import PointsList from "../../components/PointsList";
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
import { INITIAL_PASSWORD_DATA } from "../../dummyData";
import { classes } from "./ChangePassword.styles";
import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const [formData, setFormData] = useState(INITIAL_PASSWORD_DATA);
  const [passwordValidations, setPasswordValidation] = useState({
    oneNumericValue: false,
    oneCapitalLetterValue: false,
    oneSmallLetterValue: false,
    oneSpecialCharacterValue: false,
    atLeast6Characters: false,
    bothEqual: false,
  });
  const [shouldShow, setShouldShow] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

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
    userProfileDispatch(setShowChangePasswordModal(false));
  };

  const handleOnSubmit = () => {};

  useEffect(() => {
    passwordStrengthCheck(formData.new_password, formData.confirm_password);
  }, [formData.new_password, formData.new_password]);

  return (
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
                    eyeImage
                  />
                </div>
              }
            />
          ))}
          <TwoRow
            topSection={
              <PointsList
                pointsArray={passwordStrengthPointsArray}
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
                actionBtnText={intl.formatMessage({
                  id: "label.saveChanges",
                })}
                cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                onActionBtnClick={handleOnSubmit}
                isActionBtnDisable={false}
                onCancelBtnClick={handleCloseModal}
              />
            }
          />
        </>
      </Base>
    </Modal>
  );
};

export default ChangePassword;
