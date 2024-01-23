import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Image, Modal, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../components/CustomButton";
import useHeader from "../../core/hooks/useHeader";
import { setShowLogoutModal } from "../../globalContext/userProfile/userProfileActions";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import styles from "./ConfirmLogout.module.scss";
import "./Override.css"

const ConfirmLogout = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const { onLogout } = useHeader();

  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);
  const { showLogoutModal } = userProfileDetails;

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
        <div className={styles.buttonsContainer}>
          <CustomButton
            onClick={() => userProfileDispatch(setShowLogoutModal(false))}
            customButtonContainerStyle={styles.customButtonContainerStyle}
            btnText={intl.formatMessage({ id: "label.cancel" })}
            customStyle={`${styles.btn} ${styles.btn_1}`}
          />
          <CustomButton
            onClick={onLogout}
            btnText={intl.formatMessage({ id: "label.logout" })}
            customStyle={styles.btn}
            customButtonContainerStyle={styles.customButtonContainerStyle}
          />
        </div>
      </Base>
    </Modal>
  );
};

export default ConfirmLogout;
