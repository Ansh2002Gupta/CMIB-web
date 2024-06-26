import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { ThemeContext } from "core/providers/theme";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink/ButtonAndLink";
import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal/CustomModal";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import PointsList from "../../components/PointsList";
import useCreateNewPassword from "../../services/api-services/ResetPassword/useCreateNewPassword";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  AT_LEAST_SIX_CHARACTERS_REGEX,
  AT_LEAST_ONE_SPECIAL_CHARACTER,
  AT_LEAST_ONE_NUMERIC_VALUE,
  AT_LEAST_ONE_SMALL_LETTER,
  AT_LEAST_ONE_CAPITAL_LETTER,
} from "../../constant/regex";
import { getPasswordStrengthPointsArray } from "../../constant/passwordRules";
import { LOGIN } from "../../routes/routeNames";
import styles from "./CreateNewPassword.module.scss";

const CreateNewPassword = ({ token }) => {
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

  const passwordStrengthPointsArray = getPasswordStrengthPointsArray(intl, passwordValidations)

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
      password: formInputs.password,
      token,
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

  const getCurrentErrorText = () => {
    if (status && status !== "label.newPasswordAndConfirmPasswordMatched") {
      return intl.formatMessage({
        id: status,
      });
    }

    return errorWhileCreatingPassword;
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
          <ButtonAndLink
            loading={isLoading}
            error={getCurrentErrorText()}
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
            customContainerStyles={styles.minHeight}
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
            closeIcon={false}
            imgElement={getImage("CircleCheck")}
            maskClosable={false}
            onCancel={() => {
              setStatus("");
            }}
            onBtnClick={() => navigate(LOGIN)}
          />
        </div>
      </form>
    </Base>
  );
};

export default CreateNewPassword;
