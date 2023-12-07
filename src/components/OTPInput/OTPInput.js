import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Statistic, Button } from "antd";
import { InputOTP } from "antd-input-otp";

import Base from "../../core/layouts/Base/Base";

import GreenButton from "../GreenButton";
import { useIntl } from "react-intl";
import styles from "./OTPInput.module.scss";

const OTPInput = ({ noOfBlocks }) => {
  const [otpValues, setOtpValues] = useState(new Array(noOfBlocks).fill(""));
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);
  const [showCountdown, setShowCountdown] = useState(1);
  const [noOfTimesOTPCanBeSend, setNoOfTimesOTPCanBeSend] = useState(4);
  const { Countdown } = Statistic;
  const intl = useIntl();

  const handleTimerEnd = (timerLength) => {
    if (timerLength === 15) {
      setNoOfTimesOTPCanBeSend(4);
    }
    setShowCountdown(0);
    console.log("Timer finish");
  };

  const handleOnSubmit = () => {
    // TODO: Integrate API
    console.log({ otpValues });
  };

  const sendOTP = () => {
    if (noOfTimesOTPCanBeSend === 1) {
      setShowCountdown(2);
      return;
    }
    setNoOfTimesOTPCanBeSend((prev) => prev - 1);
    setShowCountdown(1);
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
          {intl.formatMessage({ id: "label.otpHeading" })}
        </Typography>
      </div>
      <div className={styles.otpFieldsAndButtonContainer}>
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
                      {/* TODO: Have to find some workaround for countdown component styles issue. */}
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
        <GreenButton
          btnText="Submit"
          onClick={handleOnSubmit}
          isBtnDisable={!isAllowedToSubmit}
        />
      </div>
    </Base>
  );
};

OTPInput.defaultProps = {
  noOfBlocks: 4,
};

OTPInput.propTypes = {
  noOfBlocks: PropTypes.number,
};

export default OTPInput;
