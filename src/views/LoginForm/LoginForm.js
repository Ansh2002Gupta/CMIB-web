import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Typography } from "antd";

import { Base } from "core/layouts";

import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import OTPInput from "../../components/OTPInput/OTPInput";
import withCardView from "../../hocs/withCardView";
import useAuthOTP from "../../core/hooks/useAuthOTP";
import useCheckOTP from "../../core/hooks/useCheckOTP";
import useLogin from "../../core/hooks/useLogin";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { DASHBOARD, FORGOT_PASSWORD } from "../../routes/routeNames";
import { EMAIL_REGEX } from "../../constant/regex";
import { ADMIN_ROUTE, CHECK_OTP_END_POINT } from "../../constant/apiEndpoints";
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
    if (loginApiStatus === "success" && loginResponse) {
      if (loginResponse?.is_two_factor === 1) {
        setCurrentActiveScreen(2);
        return;
      }
      !loginError && !isLoading && navigate(DASHBOARD);
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
    return () => {
      setIsEmailValid(true);
      setIsAllowedToLogin(false);
      setShowPassword(false);
      setCurrentActiveScreen(1);
    };
  }, []);

  return (
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
                errorMessage={intl.formatMessage({ id: "label.invalidEmail" })}
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
              {loginError ? (
                <Typography className={styles.errorText}>
                  {loginError}
                </Typography>
              ) : (
                ""
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading || isOTPLoading}
                block
                className={styles.loginBtn}
                onClick={handleOnLogin}
                disabled={!isAllowedToLogin}
              >
                {intl.formatMessage({ id: "label.loginBtn" })}
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
                onSuccess: () => navigate(DASHBOARD),
                payload: { otp },
                url: ADMIN_ROUTE + CHECK_OTP_END_POINT,
              })
            }
          />
        )}
      </div>
    </Base>
  );
};

export default withCardView(LoginForm);
