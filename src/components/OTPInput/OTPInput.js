import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";
import { InputOTP } from "antd-input-otp";

import { Base, TwoColumn } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import ButtonAndLink from "../ButtonAndLink/ButtonAndLink";
import CustomCountdown from "../CustomCountdown";
import { LOGIN } from "../../routes/routeNames";
import {
  TIMER_OF_1_MINUTES,
  TIMER_OF_15_MINUTES,
} from "../../constant/constant";
import styles from "./OTPInput.module.scss";
import "./Override.css";

const OTPInput = ({
  email,
  errorWhileSendingOTP,
  errorWhileVerifyingOTP,
  handleAuthOTP,
  headingText,
  isCheckingOTP,
  isOTPLoading,
  noOfBlocks,
  onSubmit,
  setActiveScreen,
  setCurrentActiveScreen,
  setErrorWhileSendingOTP,
  setErrorWhileVeryingOTP,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  const [otpValues, setOtpValues] = useState(new Array(noOfBlocks).fill(""));
  const [isSendAgainBtnActive, setIsSendAgainBtnActive] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const [showCountdown, setShowCountdown] = useState(1);
  const [noOfTimesOTPCanBeSend, setNoOfTimesOTPCanBeSend] = useState(4);

  const handleTimerEnd = useCallback((timerLength) => {
    setIsSendAgainBtnActive(true);
    if (timerLength === TIMER_OF_15_MINUTES) {
      setNoOfTimesOTPCanBeSend(4);
    }
    setShowCountdown(0);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(otpValues.join(""));
  };

  const sendOTP = () => {
    setErrorWhileSendingOTP("");
    setErrorWhileVeryingOTP("");
    setIsSendAgainBtnActive(false);
    if (noOfTimesOTPCanBeSend === 1) {
      setShowCountdown(2);
      return;
    }
    setNoOfTimesOTPCanBeSend((prev) => prev - 1);
    setShowCountdown(1);
    handleAuthOTP();
  };

  useEffect(() => {
    setErrorWhileSendingOTP("");
    setErrorWhileVeryingOTP("");
    const areAllFieldsFilled =
      otpValues.filter((item) => item === "").length === 0;
    if (areAllFieldsFilled) {
      setIsAllowedToSubmit(true);
      return;
    }
    setIsAllowedToSubmit(false);
  }, [otpValues]);

  useEffect(() => {
    return () => {
      setOtpValues(new Array(noOfBlocks).fill(""));
      setIsAllowedToSubmit(false);
      setShowCountdown(1);
      setNoOfTimesOTPCanBeSend(4);
    };
  }, []);

  return (
    <Base className={styles.container}>
      <div>
        <Typography className={styles.heading}>
          {headingText
            ? headingText
            : intl.formatMessage({ id: "label.otpHeading" })}
        </Typography>
        {!!email && (
          <TwoColumn
            className={styles.emailCheckStyle}
            leftSection={
              <Typography className={styles.heading}>
                {intl.formatMessage({ id: "label.emailAddress" })}
                {email}
              </Typography>
            }
            rightSection={
              <Button
                className={[styles.sendAgainText, styles.active].join(" ")}
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveScreen(1);
                }}
              >
                {responsive?.isMd
                  ? intl.formatMessage({ id: "label.changeEmailAddress" })
                  : intl.formatMessage({ id: "label.change" })}
              </Button>
            }
          />
        )}
      </div>

      <form
        className={styles.otpFieldsAndButtonContainer}
        onSubmit={handleOnSubmit}
      >
        <div className={styles.subHeadingAndInputContainer}>
          <div>
            <div className={styles.subHeadingContainer}>
              <div>
                <Typography className={styles.subHeading}>
                  {intl.formatMessage({ id: "label.otp" })}
                </Typography>
              </div>
              <div>
                <Typography className={styles.requiredStar}>*</Typography>
              </div>
            </div>

            <InputOTP
              inputType="numeric"
              autoFocus
              length={noOfBlocks}
              onChange={setOtpValues}
              value={otpValues}
              className={styles.input}
            />
          </div>
          <div className={styles.box}>
            {showCountdown === 2 && (
              <div className={styles.fourteenMinCounterContainer}>
                <div>
                  <Typography className={styles.receivedOTP}>
                    {intl.formatMessage({ id: "label.fourteenMinTimerText1" })}
                  </Typography>
                </div>
                <div className={styles.fourteenMinCounterBottomContainer}>
                  <Typography className={styles.receivedOTP}>
                    {intl.formatMessage({ id: "label.fourteenMinTimerText2" })}
                  </Typography>
                  <span>
                    <CustomCountdown
                      center={true}
                      onFinish={handleTimerEnd}
                      format="mm:ss"
                      minutes={TIMER_OF_15_MINUTES}
                    />
                  </span>
                </div>
              </div>
            )}
            {showCountdown <= 1 && (
              <>
                <Typography className={styles.receivedOTP}>
                  {intl.formatMessage({ id: "label.recievedOTP" })}
                </Typography>
                <div className={styles.sendAgainTextAndTimerContainer}>
                  <Button
                    disabled={
                      isOTPLoading || isCheckingOTP || !isSendAgainBtnActive
                    }
                    className={[
                      styles.sendAgainText,
                      showCountdown === 0 ? styles.active : "",
                    ].join(" ")}
                    type="link"
                    onClick={(e) => {
                      e.preventDefault();
                      sendOTP();
                    }}
                  >
                    {intl.formatMessage({ id: "label.sendAgain" })}
                  </Button>
                  {showCountdown === 1 ? (
                    <span>
                      <CustomCountdown
                        onFinish={handleTimerEnd}
                        format="(mm:ss)"
                        minutes={TIMER_OF_1_MINUTES}
                      />
                    </span>
                  ) : (
                    <div>
                      <Typography className={styles.active}>
                        ({noOfTimesOTPCanBeSend}{" "}
                        {intl.formatMessage({ id: "label.left" })})
                      </Typography>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <ButtonAndLink
          error={errorWhileSendingOTP || errorWhileVerifyingOTP}
          loading={isOTPLoading || isCheckingOTP}
          topBtnText={intl.formatMessage({ id: "label.submitBtn" })}
          onTopBtnClick={handleOnSubmit}
          bottomLinkText={intl.formatMessage({ id: "label.backToLoginBtn" })}
          onLinkClick={() => setCurrentActiveScreen(1)}
          isTopBtnDisable={!isAllowedToSubmit}
          linkRedirection={LOGIN}
          type="submit"
          customContainerStyles={styles.minHeight}
        />
      </form>
    </Base>
  );
};

OTPInput.defaultProps = {
  email: "",
  errorWhileSendingOTP: "",
  errorWhileVerifyingOTP: "",
  handleAuthOTP: () => {},
  headingText: "",
  isOTPLoading: false,
  noOfBlocks: 4,
  onSubmit: () => {},
  setActiveScreen: () => {},
  setCurrentActiveScreen: () => {},
  setErrorWhileSendingOTP: () => {},
  setErrorWhileVeryingOTP: () => {},
};

OTPInput.propTypes = {
  email: PropTypes.string,
  errorWhileSendingOTP: PropTypes.string,
  errorWhileVerifyingOTP: PropTypes.string,
  handleAuthOTP: PropTypes.func,
  headingText: PropTypes.string,
  isOTPLoading: PropTypes.bool,
  noOfBlocks: PropTypes.number,
  onSubmit: PropTypes.func,
  setActiveScreen: PropTypes.func,
  setCurrentActiveScreen: PropTypes.func,
  setErrorWhileSendingOTP: PropTypes.func,
  setErrorWhileVeryingOTP: PropTypes.func,
};

export default OTPInput;
