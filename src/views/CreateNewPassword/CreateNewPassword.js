import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import { ThemeContext } from "core/providers/theme";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink/ButtonAndLink";
import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal/CustomModal";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import PointsList from "../../components/PointsList";
import useCreateNewPassword from "../../services/api-services/Password/useCreateNewPassword";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  AT_LEAST_SIX_CHARACTERS_REGEX,
  AT_LEAST_ONE_SPECIAL_CHARACTER,
  AT_LEAST_ONE_NUMERIC_VALUE,
  AT_LEAST_ONE_SMALL_LETTER,
  AT_LEAST_ONE_CAPITAL_LETTER,
} from "../../constant/regex";
import { LOGIN } from "../../routes/routeNames";
import styles from "./CreateNewPassword.module.scss";

const CreateNewPassword = ({ email, otp }) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const { getImage } = useContext(ThemeContext);

  const [passwordValidations, setPasswordValidation] = useState({
    oneNumericValue: false,
    oneCapitalLetterValue: false,
    oneSmallLetterValue: false,
    oneSpecialCharacterValue: false,
    atLeast6Characters: false,
    bothEqual: false,
  });
  const [status, setStatus] = useState("");
  const [formInputs, setFormInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [shouldShow, setShouldShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    errorWhileCreatingPassword,
    handleCreateNewPassword,
    isLoading,
    createNewPasswordData,
    setErrorWhileCreatingPassword,
  } = useCreateNewPassword();

  const passwordStrengthPointsArray = [
    {
      str: intl.formatMessage({ id: "label.passwordStrengthCheck1" }),
      isValid: passwordValidations.atLeast6Characters,
    },
    {
      str: intl.formatMessage({ id: "label.passwordStrengthCheck2" }),
      isValid: passwordValidations.oneNumericValue,
    },
    {
      str: intl.formatMessage({ id: "label.passwordStrengthCheck3" }),
      isValid: passwordValidations.oneCapitalLetterValue,
    },
    {
      str: intl.formatMessage({ id: "label.passwordStrengthCheck4" }),
      isValid: passwordValidations.oneSmallLetterValue,
    },
    {
      str: intl.formatMessage({ id: "label.passwordStrengthCheck5" }),
      isValid: passwordValidations.oneSpecialCharacterValue,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValidations.bothEqual) {
      setStatus("label.newPasswordAndConfirmPasswordDoNotMatched");
      return;
    }
    if (
      !passwordValidations.atLeast6Characters ||
      !passwordValidations.oneCapitalLetterValue ||
      !passwordValidations.oneNumericValue ||
      !passwordValidations.oneSmallLetterValue ||
      !passwordValidations.oneSpecialCharacterValue
    ) {
      setStatus("label.allPasswordFieldsError");
      return;
    }
    setStatus("label.newPasswordAndConfirmPasswordMatched");
    await handleCreateNewPassword({
      email: email,
      password: formInputs.password,
      password_confirmation: formInputs.confirmPassword,
      otp: otp,
    });
  };

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

  useEffect(() => {
    passwordStrengthCheck(formInputs.password, formInputs.confirmPassword);
    setErrorWhileCreatingPassword("");
  }, [formInputs.confirmPassword, formInputs.password]);

  useEffect(() => {
    return () => {
      setFormInputs({
        password: "",
        confirmPassword: "",
      });
      setShouldShow({
        password: false,
        confirmPassword: false,
      });
      setPasswordValidation({
        oneNumericValue: false,
        oneCapitalLetterValue: false,
        oneSmallLetterValue: false,
        oneSpecialCharacterValue: false,
        atLeast6Characters: false,
        bothEqual: false,
      });
    };
  }, []);

  return (
    <Base className={styles.container}>
      <HeadingAndSubHeading
        headingText={intl.formatMessage({
          id: "label.createNewPasswordHeading",
        })}
        subHeadingText={intl.formatMessage({
          id: "label.createNewPasswordSubHeading",
        })}
      />
      <form className={styles.fieldsContainer} onSubmit={handleOnSubmit}>
        <div className={styles.inputAndPointsContainer}>
          <CustomInput
            disabled={isLoading}
            label={intl.formatMessage({ id: "label.password" })}
            customLabelStyles={styles.inputLabel}
            customInputStyles={styles.input}
            placeholder={intl.formatMessage({
              id: "label.newPasswordPlaceholder",
            })}
            type={shouldShow.password ? "text" : "password"}
            isRequired
            isSuffixRequiredForPassword
            onSuffixElementClick={() =>
              setShouldShow((prev) => {
                return {
                  ...prev,
                  password: !prev.password,
                };
              })
            }
            isTextVisible={!shouldShow.password}
            value={formInputs.password}
            onChange={(e) => {
              setStatus("");
              setFormInputs({
                ...formInputs,
                password: e?.target?.value,
              });
            }}
          />
          <CustomInput
            disabled={isLoading}
            label={intl.formatMessage({ id: "label.confirmPassword" })}
            customLabelStyles={styles.inputLabel}
            customInputStyles={styles.input}
            placeholder={intl.formatMessage({
              id: "label.confirmPasswordPlaceholder",
            })}
            isRequired
            type={shouldShow.confirmPassword ? "text" : "password"}
            isSuffixRequiredForPassword
            onSuffixElementClick={() =>
              setShouldShow((prev) => {
                return {
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                };
              })
            }
            isTextVisible={!shouldShow.confirmPassword}
            value={formInputs.confirmPassword}
            onChange={(e) => {
              setStatus("");
              setFormInputs({
                ...formInputs,
                confirmPassword: e.target.value,
              });
            }}
          />
          <PointsList
            pointsArray={passwordStrengthPointsArray}
            pointsHeading={intl.formatMessage({
              id: "label.passwordStrengthCheckHeading",
            })}
            customHeadingStyles={styles.passwordPointsHeading}
            validations={passwordValidations}
          />
        </div>
        <div>
          {!!status &&
            status !== "label.newPasswordAndConfirmPasswordMatched" && (
              <div>
                {
                  <Typography className={[styles.errorText].join(" ")}>
                    {intl.formatMessage({
                      id: status,
                    })}
                  </Typography>
                }
              </div>
            )}
          <ButtonAndLink
            loading={isLoading}
            error={
              !!errorWhileCreatingPassword ? errorWhileCreatingPassword : ""
            }
            bottomLinkText={intl.formatMessage({
              id: "label.backToLoginBtn",
            })}
            topBtnText={intl.formatMessage({
              id: "label.submitBtn",
            })}
            isTopBtnDisable={
              !(formInputs.confirmPassword && formInputs.password)
            }
            onTopBtnClick={handleOnSubmit}
            linkRedirection={LOGIN}
            type="submit"
          />
          <CustomModal
            isOpen={
              status === "label.newPasswordAndConfirmPasswordMatched" &&
              createNewPasswordData
            }
            headingText={intl.formatMessage({
              id: "label.newPasswordAndConfirmPasswordMatched",
            })}
            btnText={intl.formatMessage({
              id: "label.gobackToLoginBtn",
            })}
            ImgElement={getImage("checkedBox")}
            onCancel={() => setStatus("")}
            onBtnClick={() => navigate(LOGIN)}
          />
        </div>
      </form>
    </Base>
  );
};

export default CreateNewPassword;
