import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink";
import CreateNewPassword from "../CreateNewPassword/CreateNewPassword.js";
import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import OTPInput from "../../components/OTPInput/OTPInput";
import useCheckOTP from "../../core/hooks/useCheckOTP";
import useForgotPassword from "../../core/hooks/useForgotPassword.js";
import withCardView from "../../hocs/withCardView";
import { LOGIN } from "../../routes/routeNames.js";
import { EMAIL_REGEX } from "../../constant/regex.js";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const intl = useIntl();

  const [currentActiveScreen, setCurrentActiveScreen] = useState(1);
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);

  const {
    handleForgotPassword,
    isLoading,
    errorWhileResetPassword,
    isSuccess: forgotPasswordSuccess,
    setErrorWhileResetPassword,
  } = useForgotPassword();

  const {
    errorWhileVerifyingOTP,
    checkOTPData,
    handleCheckOTP,
    isLoading: isOTPLoading,
    isSuccess: otpVerifiedSuccess,
  } = useCheckOTP();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_REGEX.test(userName)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    handleForgotPassword({ email: userName });
  };
  const handleOTPSubmit = (otp) => {
    handleCheckOTP({
      payload: { email: userName, otp: otp?.join("") },
      onSuccess: () => setCurrentActiveScreen(3),
    });
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
            <form className={styles.bottomContainer} onSubmit={handleOnSubmit}>
              <CustomInput
                label={intl.formatMessage({ id: "label.emailId" })}
                type="email"
                disabled={isLoading}
                customLabelStyles={styles.inputLabel}
                customInputStyles={styles.input}
                isError={status === "error"}
                errorMessage={intl.formatMessage({
                  id: "label.invalidEmail",
                })}
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
                  onTopBtnClick={handleOnSubmit}
                  linkRedirection={LOGIN}
                />
              </div>
            </form>
          )}
          {currentActiveScreen === 2 && (
            <OTPInput
              errorWhileVerifyingOTP={errorWhileVerifyingOTP}
              isOTPLoading={isOTPLoading}
              handleAuthOTP={() => {
                handleForgotPassword({ email: userName });
              }}
              noOfBlocks={4}
              headingText={intl.formatMessage({
                id: "label.forgotPasswordOTP",
              })}
              onSubmit={(otp) => {
                handleOTPSubmit(otp);
              }}
              {...{
                errorWhileResetPassword,
              }}
            />
          )}
        </Base>
      ) : (
        <CreateNewPassword token={checkOTPData?.token} />
      )}
    </>
  );
};

export default withCardView(ForgotPassword);
