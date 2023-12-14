import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../../components/ButtonAndLink";
import CardView from "../../hocs/CardView/CardView";
import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import useForgotPassword from "../../core/hooks/useForgotPassword.js";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import checkedIcon from "../../themes/base/assets/images/greenCheckIcon.svg";
import { EMAIL_REGEX } from "../../Constants/Constants.js";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const intl = useIntl();
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const { navigateScreen: navigate } = useNavigateScreen();
  const {
    handleForgotPassword,
    isLoading,
    errorWhileResetPassword,
    forgotPasswordResult,
  } = useForgotPassword();

  const handleOnSubmit = async () => {
    if (!EMAIL_REGEX.test(userName)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    await handleForgotPassword({ email: userName });
    console.log("Success:", { userName });
  };

  useEffect(() => {
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
    <Base className={styles.container}>
      <HeadingAndSubHeading
        headingText={intl.formatMessage({
          id: "label.forgotPasswordHeading",
        })}
        subHeadingText={intl.formatMessage({
          id: "label.forgotPasswordSubHeading",
        })}
      />
      <div className={styles.bottomContainer}>
        <CustomInput
          label={intl.formatMessage({ id: "label.emailId" })}
          type="text"
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
        <CustomModal
          isOpen={status === "success" && forgotPasswordResult}
          headingText={intl.formatMessage({
            id: "label.thanks",
          })}
          subHeadingText={intl.formatMessage({
            id: "label.forgotPasswordSuccess",
          })}
          btnText={intl.formatMessage({
            id: "label.gobackToLoginBtn",
          })}
          imageSrc={checkedIcon}
          onCancel={() => setStatus("")}
          onBtnClick={() => navigate("/login")}
        />
        <div>
          <ButtonAndLink
            error={!!errorWhileResetPassword ? errorWhileResetPassword : ""}
            loading={isLoading}
            topBtnText={intl.formatMessage({ id: "label.submitBtn" })}
            bottomLinkText={intl.formatMessage({ id: "label.backToLoginBtn" })}
            isTopBtnDisable={!isAllowedToSubmit}
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

export default CardView(ForgotPassword);
