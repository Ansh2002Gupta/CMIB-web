import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button,Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Base } from "core/layouts";

import CardView from "../../hocs/CardView/CardView";
import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import OTPInput from "../../components/OTPInput/OTPInput";
import useLogin from "../../core/hooks/useLogin";
import useAuthOTP from "../../core/hooks/useAuthOTP";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { UserLoginContext } from "../../globalContext/userLogin/userLoginProvider";
import { DASHBOARD } from "../../routes/routeNames";
import { EMAIL_REGEX } from "../../Constants/Constants";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: "",
  });
  const [userLoginState, userLoginDispatch] = useContext(UserLoginContext);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAllowedToLogin, setIsAllowedToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentActiveScreen, setCurrentActiveScreen] = useState(1);
  const {
    error: loginError,
    data: loginResponse,
    handleUserLogin,
    isLoading,
    apiCallStatus,
  } = useLogin();
  const {
    errorWhileSendingOTP,
    handleAuthOTP,
    isLoading: isOTPLoading,
  } = useAuthOTP();

  const handleOnOTP = async () => {
    if (!loginError && !isLoading) {
      await handleAuthOTP({
        email: formInputs.userName,
      });
      setCurrentActiveScreen(2); //only when user opted for 2 factor authentication.
    }
  };

  const handleOnLogin = async () => {
    if (!isEmailValid) {
      return;
    }
    await handleUserLogin({
      email: formInputs.userName,
      password: formInputs.password,
    });
  };

  useEffect(() => {
    if (apiCallStatus === "success" && loginResponse) {
      if (loginResponse?.is_two_factor === 1) {
        handleOnOTP();
        return;
      }
      !loginError && !isLoading && navigate(DASHBOARD);
    }
  }, [apiCallStatus, loginResponse]);

  const isValidEmail = () => {
    setIsEmailValid(EMAIL_REGEX.test(formInputs?.userName));
  };

  useEffect(() => {
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
          <>
            <div className={styles.inputContainer}>
              <CustomInput
                disabled={isLoading || isOTPLoading}
                label={intl.formatMessage({ id: "label.userName" })}
                type="text"
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
                SuffixElement1={<EyeOutlined />}
                SuffixElement2={<EyeInvisibleOutlined />}
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
                  onClick={() => navigate("/forgot-password")}
                >
                  Forget password?
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
                onClick={() => {
                  isValidEmail();
                  handleOnLogin();
                }}
                disabled={!isAllowedToLogin}
              >
                {intl.formatMessage({ id: "label.loginBtn" })}
              </Button>
            </div>
          </>
        )}
        {currentActiveScreen === 2 && (
          <OTPInput
            noOfBlocks={4}
            {...{
              errorWhileSendingOTP,
              handleAuthOTP,
              isOTPLoading,
              setCurrentActiveScreen,
            }}
          />
        )}
      </div>
    </Base>
  );
};

export default CardView(LoginForm);
