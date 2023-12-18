import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Typography, Statistic, Button } from "antd";
import { InputOTP } from "antd-input-otp";

import Base from "../../core/layouts/Base/Base";

import ButtonAndLink from "../ButtonAndLink/ButtonAndLink";
import useCheckOTP from "../../core/hooks/useCheckOTP";
import { LOGIN } from "../../routes/routeNames";
import { TIMER_OF_15_MINUTES } from "../../constants/constants";
import styles from "./OTPInput.module.scss";
import "./Override.css";

const OTPInput = ({
  errorWhileSendingOTP,
  handleAuthOTP,
  headingText,
  isOTPLoading,
  noOfBlocks,
  onSubmit,
  setCurrentActiveScreen,
}) => {
  const { errorWhileVerifyingOTP, isLoading: isCheckingOTP } = useCheckOTP();
  const [otpValues, setOtpValues] = useState(new Array(noOfBlocks).fill(""));
  const [isSendAgainBtnActive, setIsSendAgainBtnActive] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const [showCountdown, setShowCountdown] = useState(1);
  const [noOfTimesOTPCanBeSend, setNoOfTimesOTPCanBeSend] = useState(4);
  const { Countdown } = Statistic;
  const intl = useIntl();

  const handleTimerEnd = (timerLength) => {
    setIsSendAgainBtnActive(true);
    if (timerLength === TIMER_OF_15_MINUTES) {
      setNoOfTimesOTPCanBeSend(4);
    }
    setShowCountdown(0);
  };

  const handleOnSubmit = () => {
    //TODO: Call an API for finding out does the entered OTP is correct or not.
    onSubmit(otpValues);
  };

  const sendOTP = () => {
    // TODO: call api for sending a new OTP
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
      </div>
      <form className={styles.otpFieldsAndButtonContainer}>
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
          error={
            errorWhileSendingOTP || errorWhileVerifyingOTP
              ? intl.formatMessage({ id: "label.somethingWentWrong" })
              : ""
          }
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
  handleAuthOTP: () => {},
  headingText: "",
  isOTPLoading: false,
  noOfBlocks: 4,
  onSubmit: () => {},
  setCurrentActiveScreen: () => {},
};

OTPInput.propTypes = {
  errorWhileSendingOTP: PropTypes.string,
  handleAuthOTP: PropTypes.func,
  headingText: PropTypes.string,
  isOTPLoading: PropTypes.bool,
  noOfBlocks: PropTypes.number,
  onSubmit: PropTypes.func,
  setCurrentActiveScreen: PropTypes.func,
};

export default OTPInput;
