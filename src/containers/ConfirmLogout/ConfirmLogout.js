import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import { ThemeContext } from "core/providers/theme";
import useHeader from "../../core/hooks/useHeader";

import CustomButton from "../../components/CustomButton";
import useLogout from "../../services/api-services/Logout/useLogout";
import { getErrorText } from "../../constant/utils";
import { setShowLogoutModal } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import styles from "./ConfirmLogout.module.scss";
import "./Override.css";

const ConfirmLogout = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { onLogout } = useHeader();
  const { error, isLoading, setError, logoutApiStatus, handleUserLogout } =
    useLogout();

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const { showLogoutModal } = userProfileDetails;

  const onCancelClick = () => {
    setError("");
    userProfileDispatch(setShowLogoutModal(false));
  };

  useEffect(() => {
    if (logoutApiStatus === "success") {
      !error && !isLoading && onLogout();
    }
  }, [logoutApiStatus]);

  return (
    <Modal
      className={styles.modal}
      footer={null}
      open={showLogoutModal}
      maskClosable={false}
      closeIcon={false}
      centered={true}
      width={400}
    >
      <Base className={styles.container}>
        <div className={styles.imageAndHeadingContainer}>
          <div>
            <Image
              src={getImage("featuredIcon")}
              className={styles.image}
              preview={false}
            />
          </div>
          <div className={styles.headingAndSubHeadingContainer}>
            <div>
              <Typography className={styles.heading}>
                {intl.formatMessage({ id: "label.logout" })}
              </Typography>
            </div>
            <div>
              <Typography className={styles.subHeading}>
                {intl.formatMessage({ id: "label.logoutConfirmationMessage" })}
              </Typography>
            </div>
          </div>
        </div>
        {error && (
          <Typography
            className={[styles.errorText, !!error ? styles.showError : ""].join(
              " "
            )}
          >
            {getErrorText(error)}
          </Typography>
        )}

        <div className={styles.buttonsContainer}>
          <CustomButton
            onClick={onCancelClick}
            customButtonContainerStyle={styles.customButtonContainerStyle}
            customStyle={styles.btn}
            btnText={intl.formatMessage({ id: "label.cancel" })}
            isBtnDisable={isLoading}
          />
          <CustomButton
            onClick={handleUserLogout}
            btnText={
              isLoading ? "" : intl.formatMessage({ id: "label.logout" })
            }
            customStyle={`${styles.btn} ${styles.btn_1}`}
            customButtonContainerStyle={styles.customButtonContainerStyle}
            loading={isLoading}
          />
        </div>
      </Base>
    </Modal>
  );
};

export default ConfirmLogout;
