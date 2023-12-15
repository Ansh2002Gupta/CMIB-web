import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink";
import CardView from "../../hocs/CardView/CardView";
import CreateNewPassword from "../CreateNewPassword/CreateNewPassword.js";
import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import OTPInput from "../../components/OTPInput/OTPInput";
import useForgotPassword from "../../core/hooks/useForgotPassword.js";
import { EMAIL_REGEX } from "../../Constants/Constants.js";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const intl = useIntl();
  const [currentActiveScreen, setCurrentActiveScreen] = useState(1);
  const [userName, setUserName] = useState("");
  const [userEnteredOTP, setUserEnteredOTP] = useState(null);
  const [status, setStatus] = useState("");
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const {
    handleForgotPassword,
    isLoading,
    errorWhileResetPassword,
    isSuccess: forgotPasswordSuccess,
    setErrorWhileResetPassword,
  } = useForgotPassword();

  const handleOnSubmit = async () => {
    if (!EMAIL_REGEX.test(userName)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    await handleForgotPassword({ email: userName });
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      setCurrentActiveScreen(2);
    }
  }, [forgotPasswordSuccess]);

  useEffect(() => {
    setErrorWhileResetPassword("");
    if (userName) {
      setIsAllowedToSubmit(true);
      return;
    }
    setIsAllowedToSubmit(false);
  }, [userName]);

  useEffect(() => {
    return () => {
      setUserName("");
      setStatus("");
      setIsAllowedToSubmit(false);
    };
  }, []);

  return (
    <>
      {currentActiveScreen <= 2 ? (
        <Base
          className={[
            styles.container,
            currentActiveScreen === 2 ? styles.secondScreen : "",
          ].join(" ")}
        >
          <HeadingAndSubHeading
            headingText={intl.formatMessage({
              id: "label.forgotPasswordHeading",
            })}
            subHeadingText={
              currentActiveScreen === 1
                ? intl.formatMessage({
                    id: "label.forgotPasswordSubHeading",
                  })
                : ""
            }
          />
          {currentActiveScreen === 1 && (
            <div className={styles.bottomContainer}>
              <CustomInput
                label={intl.formatMessage({ id: "label.emailId" })}
                type="text"
                disabled={isLoading}
                customLabelStyles={styles.inputLabel}
                customInputStyles={styles.input}
                isError={status === "error"}
                errorMessage={intl.formatMessage({ id: "label.invalidEmail" })}
                placeholder={intl.formatMessage({
                  id: "label.userNamePlaceHolder",
                })}
                isRequired
                value={userName}
                onChange={(e) => {
                  setStatus("");
                  setUserName(e?.target?.value);
                }}
              />
              <div>
                <ButtonAndLink
                  error={
                    !!errorWhileResetPassword ? errorWhileResetPassword : ""
                  }
                  loading={isLoading}
                  topBtnText={intl.formatMessage({ id: "label.submitBtn" })}
                  bottomLinkText={intl.formatMessage({
                    id: "label.backToLoginBtn",
                  })}
                  isTopBtnDisable={!isAllowedToSubmit}
                  onTopBtnClick={() => {
                    handleOnSubmit();
                  }}
                  linkRedirection={"/login"}
                />
              </div>
            </div>
          )}
          {currentActiveScreen === 2 && (
            <OTPInput
              noOfBlocks={4}
              headingText={intl.formatMessage({
                id: "label.forgotPasswordOTP",
              })}
              onSubmit={(otp) => {
                setCurrentActiveScreen(3);
                setUserEnteredOTP(otp);
              }}
              {...{
                errorWhileResetPassword,
              }}
            />
          )}
        </Base>
      ) : (
        <CreateNewPassword otp={userEnteredOTP?.join("")} email={userName} />
      )}
    </>
  );
};

export default CardView(ForgotPassword);
