import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Typography, Image } from "antd";

import variables from "../../themes/base/styles/variables";
import { Base } from "core/layouts";

import CardView from "../../hocs/CardView/CardView";
import CustomInput from "../../components/CustomInput";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import checkedBox from "../../themes/base/assets/images/checkedBox.svg";
import unCheckedBox from "../../themes/base/assets/images/unCheckedBox.svg";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const intl = useIntl();
  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: "",
  });
  const [shouldRememberMe, setShouldRememberMe] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAllowedToLogin, setIsAllowedToLogin] = useState(false);

  const handleOnLogin = () => {
    if (!isEmailValid) {
      return;
    }
    console.log("Success:", { formInputs, shouldRememberMe });
  };

  const isValidEmail = () => {
    setIsEmailValid(variables.emailRegex.test(formInputs?.userName));
  };

  useEffect(() => {
    if (formInputs.userName && formInputs.password) {
      setIsAllowedToLogin(true);
      return;
    }
    setIsAllowedToLogin(false);
  }, [formInputs?.userName, formInputs?.password]);

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
        <div className={styles.inputContainer}>
          <CustomInput
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
            label={intl.formatMessage({ id: "label.password" })}
            customLabelStyles={styles.inputLabel}
            customInputStyles={styles.input}
            placeholder={intl.formatMessage({
              id: "label.passwordPlaceholder",
            })}
            isRequired
            type="password"
            value={formInputs.password}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                password: e.target.value,
              })
            }
          />
          <div className={styles.forgotLinkAndRememberMeContainer}>
            <span
              className={styles.rememberMeContainer}
              onClick={() => setShouldRememberMe((prev) => !prev)}
            >
              <Image
                src={shouldRememberMe ? checkedBox : unCheckedBox}
                className={styles.rememberMeImage}
                width={20}
                preview={false}
              />
              <Typography className={styles.rememberMeText}>
                Remember Me
              </Typography>
            </span>
            <div>
              <Button className={styles.forgotLink} type="link">
                Forget password?
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            htmlType="submit"
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
      </div>
    </Base>
  );
};

export default CardView(LoginForm);
