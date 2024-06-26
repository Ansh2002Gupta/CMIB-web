import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Typography } from "antd";

import { Base } from "core/layouts";

import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import OTPInput from "../../components/OTPInput/OTPInput";
import withCardView from "../../hocs/withCardView";
import { LogoutContext } from "../../globalContext/logout/logoutProvider";
import { setLogoutToast } from "../../globalContext/logout/logoutActions";
import useLogin from "../../services/api-services/Login/useLogin";
import useAuthOTP from "../../services/api-services/Otp/useAuthOTP";
import useCheckOTP from "../../services/api-services/Otp/useCheckOTP";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import { getErrorText } from "../../constant/utils";
import { ADMIN_ROUTE, VERIFY_OTP } from "../../constant/apiEndpoints";
import { FORGOT_PASSWORD, ROOT } from "../../routes/routeNames";
import { EMAIL_REGEX } from "../../constant/regex";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAllowedToLogin, setIsAllowedToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentActiveScreen, setCurrentActiveScreen] = useState(1);
  const [logoutState, setLogoutDispatch] = useContext(LogoutContext);
  const { logoutInfo } = logoutState;
  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    data: loginResponse,
    error: loginError,
    handleUserLogin,
    isLoading,
    loginApiStatus,
    setError: setLoginError,
  } = useLogin();

  const {
    errorWhileSendingOTP,
    handleAuthOTP,
    isLoading: isOTPLoading,
    setErrorWhileSendingOTP,
  } = useAuthOTP();

  const {
    errorWhileVerifyingOTP,
    handleCheckOTP,
    isLoading: isCheckingOTP,
    setErrorWhileVeryingOTP,
  } = useCheckOTP();

  const handleOnLogin = (e) => {
    e?.preventDefault();
    isValidEmail();
    setLoginError("");
    if (!EMAIL_REGEX.test(formInputs?.userName)) {
      return;
    }
    handleUserLogin({
      email: formInputs.userName,
      password: formInputs.password,
    });
  };

  useEffect(() => {
    if (loginApiStatus === "success") {
      if (loginResponse?.token) {
        setCurrentActiveScreen(2);
        return;
      }
      !loginError && !isLoading && navigate(ROOT);
    }
  }, [loginApiStatus, loginResponse]);

  const isValidEmail = () => {
    setIsEmailValid(EMAIL_REGEX.test(formInputs?.userName));
  };

  useEffect(() => {
    setLoginError("");
    if (formInputs.userName && formInputs.password) {
      setIsAllowedToLogin(true);
      return;
    }
    setIsAllowedToLogin(false);
  }, [formInputs?.userName, formInputs?.password]);

  useEffect(() => {
    if (logoutInfo.isSuccess) {
      showNotification({ text: logoutInfo.message, type: "success" });
      setLogoutDispatch(
        setLogoutToast({
          isSuccess: false,
          message: "",
        })
      );
    }
    return () => {
      setIsEmailValid(true);
      setIsAllowedToLogin(false);
      setShowPassword(false);
      setCurrentActiveScreen(1);
    };
  }, []);

  return (
    <>
      {notificationContextHolder}
      <Base className={styles.loginForm}>
        <HeadingAndSubHeading
          headingText={intl.formatMessage({ id: "label.loginHeading" })}
          subHeadingText={intl.formatMessage({ id: "label.loginSubheading" })}
        />
        <div
          className={[
            styles.inputAndBtnContainer,
            styles.borderForMobileScreens,
          ].join(" ")}
        >
          {currentActiveScreen === 1 && (
            <form onSubmit={handleOnLogin} className={styles.formContainer}>
              <div className={styles.inputContainer}>
                <CustomInput
                  disabled={isLoading || isOTPLoading}
                  label={intl.formatMessage({ id: "label.userName" })}
                  type="email"
                  customLabelStyles={styles.inputLabel}
                  customInputStyles={styles.input}
                  isError={!isEmailValid}
                  errorMessage={intl.formatMessage({
                    id: "label.invalidEmail",
                  })}
                  placeholder={intl.formatMessage({
                    id: "label.userNamePlaceHolder",
                  })}
                  isRequired
                  value={formInputs.userName}
                  onChange={(e) => {
                    setIsEmailValid(true);
                    setFormInputs({
                      ...formInputs,
                      userName: e?.target?.value,
                    });
                  }}
                />
                <CustomInput
                  disabled={isLoading || isOTPLoading}
                  label={intl.formatMessage({ id: "label.password" })}
                  customLabelStyles={styles.inputLabel}
                  customInputStyles={styles.input}
                  placeholder={intl.formatMessage({
                    id: "label.passwordPlaceholder",
                  })}
                  isRequired
                  type={showPassword ? "text" : "password"}
                  isSuffixRequiredForPassword
                  onSuffixElementClick={() => setShowPassword((prev) => !prev)}
                  isTextVisible={!showPassword}
                  value={formInputs.password}
                  onChange={(e) =>
                    setFormInputs({
                      ...formInputs,
                      password: e.target.value,
                    })
                  }
                />
                <div className={styles.forgotLinkContainer}>
                  <Button
                    disabled={isLoading || isOTPLoading}
                    className={styles.forgotLink}
                    type="link"
                    onClick={() => navigate(FORGOT_PASSWORD)}
                  >
                    {intl.formatMessage({ id: "label.forgotPasswordHeading" })}
                  </Button>
                </div>
              </div>
              <div>
                <Typography
                  className={[
                    styles.errorText,
                    !!loginError ? styles.showError : "",
                  ].join(" ")}
                >
                  {getErrorText(loginError)}
                </Typography>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading || isOTPLoading}
                  block
                  className={styles.loginBtn}
                  onClick={handleOnLogin}
                  disabled={!isAllowedToLogin}
                >
                  {isLoading
                    ? ""
                    : intl.formatMessage({ id: "label.loginBtn" })}
                </Button>
              </div>
            </form>
          )}
          {currentActiveScreen === 2 && (
            <OTPInput
              noOfBlocks={4}
              {...{
                errorWhileSendingOTP,
                errorWhileVerifyingOTP,
                isOTPLoading,
                isCheckingOTP,
                setCurrentActiveScreen,
                setErrorWhileSendingOTP,
                setErrorWhileVeryingOTP,
              }}
              handleAuthOTP={() => {
                handleAuthOTP({ email: formInputs?.userName });
              }}
              onSubmit={(otp) =>
                handleCheckOTP({
                  onSuccessCallback: () => navigate(ROOT),
                  payload: {
                    token: loginResponse?.token,
                    otp,
                    two_factor_check: 1,
                  },
                  url: ADMIN_ROUTE + VERIFY_OTP,
                })
              }
            />
          )}
        </div>
      </Base>
    </>
  );
};

export default withCardView(LoginForm);
