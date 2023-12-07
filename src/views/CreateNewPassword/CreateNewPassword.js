import React, { useMemo, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink/ButtonAndLink";
import CardView from "../../hocs/CardView/CardView";
import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal/CustomModal";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import PointsList from "../../components/PointsList";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  atLeast6CharacterRegex,
  atLeastOneCapitalLetter,
  atLeastOneNumericValue,
  atLeastOneSmallLetter,
  atLeastOneSpecialCharacter,
} from "../../Constants/constants";
import checkedIcon from "../../themes/base/assets/images/greenCheckIcon.svg";
import styles from "./CreateNewPassword.module.scss";

const CreateNewPassword = () => {
  const intl = useIntl();
  const [passwordValidations, setPasswordValidation] = useState({
    oneNumericValue: false,
    oneCapitalLetterValue: false,
    oneSmallLetterValue: false,
    oneSpecialCharacterValue: false,
    atLeast6Characters: false,
    bothEqual: false,
  });
  const [status, setStatus] = useState("");
  const { navigateScreen: navigate } = useNavigateScreen();
  const passwordStrengthPointsArray = useMemo(() => {
    return [
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
  }, [passwordValidations]);
  const [formInputs, setFormInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [shouldShow, setShouldShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const handleOnSubmit = () => {
    // TODO: Integrate API.
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
    console.log("Success:", { formInputs });
  };
  const passwordStrengthCheck = (newPassword, confirmPassword) => {
    setPasswordValidation({
      oneNumericValue: atLeastOneNumericValue.test(newPassword),
      oneCapitalLetterValue: atLeastOneCapitalLetter.test(newPassword),
      oneSmallLetterValue: atLeastOneSmallLetter.test(newPassword),
      oneSpecialCharacterValue: atLeastOneSpecialCharacter.test(newPassword),
      atLeast6Characters: atLeast6CharacterRegex.test(newPassword),
      bothEqual: newPassword === confirmPassword,
    });
  };

  useEffect(() => {
    passwordStrengthCheck(formInputs.password, formInputs.confirmPassword);
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
      <div className={styles.fieldsContainer}>
        <div className={styles.inputAndPointsContainer}>
          <CustomInput
            label={intl.formatMessage({ id: "label.password" })}
            customLabelStyles={styles.inputLabel}
            customInputStyles={styles.input}
            placeholder={intl.formatMessage({
              id: "label.newPasswordPlaceholder",
            })}
            type={shouldShow.password ? "text" : "password"}
            isRequired
            isSuffixRequiredForPassword
            SuffixElement1={<EyeOutlined />}
            SuffixElement2={<EyeInvisibleOutlined />}
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
                password: e.target.value,
              });
            }}
          />
          <CustomInput
            label={intl.formatMessage({ id: "label.confirmPassword" })}
            customLabelStyles={styles.inputLabel}
            customInputStyles={styles.input}
            placeholder={intl.formatMessage({
              id: "label.confirmPasswordPlaceholder",
            })}
            isRequired
            type={shouldShow.confirmPassword ? "text" : "password"}
            isSuffixRequiredForPassword
            SuffixElement1={<EyeOutlined />}
            SuffixElement2={<EyeInvisibleOutlined />}
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
          {!!status && status !== "label.newPasswordAndConfirmPasswordMatched" && (
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
          <CustomModal
            isOpen={status === "label.newPasswordAndConfirmPasswordMatched"}
            headingText={intl.formatMessage({
              id: "label.newPasswordAndConfirmPasswordMatched",
            })}
            btnText={intl.formatMessage({
              id: "label.gobackToLoginBtn",
            })}
            imageSrc={checkedIcon}
            onCancel={() => setStatus("")}
            onBtnClick={()=> navigate("/login")}
          />
          <ButtonAndLink
            bottomLinkText={intl.formatMessage({
              id: "label.backToLoginBtn",
            })}
            topBtnText={intl.formatMessage({
              id: "label.submitBtn",
            })}
            isTopBtnDisable={
              !(formInputs.confirmPassword && formInputs.password)
            }
            onTopBtnClick={() => {
              handleOnSubmit();
            }}
            linkRedirection="/login"
          />
        </div>
      </div>
    </Base>
  );
};

export default CardView(CreateNewPassword);
