import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Typography, Statistic, Button } from "antd";
import { InputOTP } from "antd-input-otp";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../ButtonAndLink/ButtonAndLink";
import useCheckOTP from "../../core/hooks/useCheckOTP";
import { LOGIN } from "../../routes/routeNames";
import { TIMER_OF_15_MINUTES } from "../../constant/constant";
import styles from "./OTPInput.module.scss";
import "./Override.css";

const OTPInput = ({
  errorWhileSendingOTP,
  errorWhileVerifyingOTP,
  handleAuthOTP,
  headingText,
  isOTPLoading,
  noOfBlocks,
  onSubmit,
  setCurrentActiveScreen,
}) => {
  const { isLoading: isCheckingOTP } = useCheckOTP();
  const [otpValues, setOtpValues] = useState(new Array(noOfBlocks).fill(""));
  const [isSendAgainBtnActive, setIsSendAgainBtnActive] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const [showCountdown, setShowCountdown] = useState(1);
  const [noOfTimesOTPCanBeSend, setNoOfTimesOTPCanBeSend] = useState(4);
  const { Countdown } = Statistic;
  const [otpError, setOtpError] = useState("");
  const intl = useIntl();

  const handleTimerEnd = (timerLength) => {
    setIsSendAgainBtnActive(true);
    if (timerLength === TIMER_OF_15_MINUTES) {
      setNoOfTimesOTPCanBeSend(4);
    }
    setShowCountdown(0);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(otpValues);
  };

  const sendOTP = () => {
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
    const areAllFieldsFilled =
      otpValues.filter((item) => item === "").length === 0;
    if (areAllFieldsFilled) {
      setIsAllowedToSubmit(true);
      return;
    }
    setIsAllowedToSubmit(false);
    setOtpError("");
  }, [otpValues]);

  useEffect(() => {
    return () => {
      setOtpValues(new Array(noOfBlocks).fill(""));
      setIsAllowedToSubmit(false);
      setShowCountdown(1);
      setNoOfTimesOTPCanBeSend(4);
    };
  }, []);

  useEffect(() => {
    if (errorWhileSendingOTP || errorWhileVerifyingOTP) {
      setOtpError(errorWhileSendingOTP || errorWhileVerifyingOTP);
    }
  }, [errorWhileSendingOTP, errorWhileVerifyingOTP]);

  return (
    <Base className={styles.container}>
      <div>
        <Typography className={styles.heading}>
          {headingText
            ? headingText
            : intl.formatMessage({ id: "label.otpHeading" })}
        </Typography>
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
                    <Countdown
                      onFinish={() => handleTimerEnd(15)}
                      value={new Date().setMinutes(
                        new Date().getMinutes() + 15
                      )}
                      format="mm:ss"
                      className={styles["ant-statistic-content-value"]}
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
                    onClick={sendOTP}
                  >
                    {intl.formatMessage({ id: "label.sendAgain" })}
                  </Button>
                  {showCountdown === 1 ? (
                    <span>
                      <Countdown
                        onFinish={() => handleTimerEnd(1)}
                        value={new Date().setMinutes(
                          new Date().getMinutes() + 1
                        )}
                        format="(mm:ss)"
                        className={styles["ant-statistic-content-value"]}
                      />
                    </span>
                  ) : (
                    <div>
                      <Typography className={styles.active}>
                        ({noOfTimesOTPCanBeSend} left)
                      </Typography>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <ButtonAndLink
          error={otpError}
          loading={isOTPLoading || isCheckingOTP}
          topBtnText={intl.formatMessage({ id: "label.submitBtn" })}
          onTopBtnClick={handleOnSubmit}
          bottomLinkText={intl.formatMessage({ id: "label.backToLoginBtn" })}
          onLinkClick={() => setCurrentActiveScreen(1)}
          isTopBtnDisable={!isAllowedToSubmit}
          linkRedirection={LOGIN}
          type="submit"
        />
      </form>
    </Base>
  );
};

OTPInput.defaultProps = {
  errorWhileSendingOTP: "",
  errorWhileVerifyingOTP: "",
  handleAuthOTP: () => {},
  headingText: "",
  isOTPLoading: false,
  noOfBlocks: 4,
  onSubmit: () => {},
  setCurrentActiveScreen: () => {},
};

OTPInput.propTypes = {
  errorWhileSendingOTP: PropTypes.string,
  errorWhileVerifyingOTP: PropTypes.string,
  handleAuthOTP: PropTypes.func,
  headingText: PropTypes.string,
  isOTPLoading: PropTypes.bool,
  noOfBlocks: PropTypes.number,
  onSubmit: PropTypes.func,
  setCurrentActiveScreen: PropTypes.func,
};

export default OTPInput;
