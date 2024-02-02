import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Typography, Image, Switch } from "antd";

import { ThreeRow, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "../../core/hooks/useResponsive";

import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import useUpdateUserProfileApi from "../../services/api-services/UserProfile/useUpdateUserProfileApi";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { formatDate } from "../../constant/utils";
import { classes } from "./ViewProfileDetails.styles";
import styles from "./ViewProfileDetails.module.scss";

const ViewProfileDetails = ({ setCurrentOpenModal, showNotification }) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const { getImage } = useContext(ThemeContext);
  const intl = useIntl();

  const userName = userProfileDetails?.userDetails?.name;
  const firstName = userName?.split(" ")?.[0] || "";
  const lastName = userName?.split(" ")?.[1] || "";
  const profileImage = userProfileDetails?.userDetails?.profile_photo;
  const email = userProfileDetails?.userDetails?.email || "--";
  const phone = userProfileDetails?.userDetails?.mobile_number || "--";
  const createdDate = userProfileDetails?.userDetails?.created_at
    ? formatDate({ date: userProfileDetails?.userDetails?.created_at })
    : "--";

  const [is2FactorAuthenicationOn, setIs2FactorAuthenicationOn] = useState(
    Boolean(userProfileDetails?.userDetails?.is_two_factor)
  );

  const { handleUpdatingUserProfile, isLoading } = useUpdateUserProfileApi();

  const responsive = useResponsive();

  const updateUserData = () => {
    const payload = {
      is_two_factor: !is2FactorAuthenicationOn ? 1 : 0,
    };
    handleUpdatingUserProfile({
      payload,
      onSuccessCallback: () => setIs2FactorAuthenicationOn((prev) => !prev),
      onErrorCallback: (errorString) => showNotification(errorString, "error"),
    });
  };

  return (
    <>
      <TwoRow
        className={styles.profileMainContainer}
        topSection={
          <TwoRow
            className={styles.secondSectionStyle}
            topSectionStyle={classes.crossStyle}
            topSection={
              <Image
                preview={false}
                src={getImage("cross")}
                className={styles.crossIconStyle}
                onClick={() => setCurrentOpenModal(0)}
              />
            }
            bottomSection={
              <ProfileIcon
                firstName={firstName}
                lastName={lastName}
                profileImage={profileImage}
                imageContainerStyle={styles.imageContainerStyle}
                initialContainerStyle={styles.initialContainerStyle}
                onClick={() => {
                  setCurrentOpenModal(3);
                }}
                iconType="modalIcon"
                showEditModal
                icon={getImage("smallCircularEditBtn")}
              />
            }
          />
        }
        bottomSection={
          <ThreeRow
            className={styles.bottomBox}
            topSection={
              <div className={[styles.secondSectionStyle].join(" ")}>
                <Typography className={styles.headingText}>
                  {`${userName}`}
                </Typography>
                <div className={styles.emailAndMobileNoContainer}>
                  <Typography
                    className={[
                      styles.subHeadingText,
                      styles.rightAlign,
                      styles.greyText,
                    ].join(" ")}
                    title={phone}
                  >
                    {phone}
                  </Typography>
                  <div className={styles.divider}></div>
                  <Typography
                    className={[
                      styles.subHeadingText,
                      styles.leftAlign,
                      styles.greyText,
                    ].join(" ")}
                  >
                    {email}
                  </Typography>
                </div>
              </div>
            }
            middleSection={
              <div className={styles.accessAndDateContainer}>
                <div className={styles.textAndValueContainer}>
                  <Typography className={styles.greyText}>
                    {intl.formatMessage({ id: "label.dateCreatedOn" })}:
                  </Typography>
                  <Typography className={styles.darkText}>
                    {createdDate}
                  </Typography>
                </div>
              </div>
            }
            bottomSection={
              <div className={styles.textAndValueContainer}>
                <Switch
                  className={is2FactorAuthenicationOn ? styles.switch : ""}
                  checked={is2FactorAuthenicationOn}
                  onChange={updateUserData}
                  size={!responsive.isSm ? "small" : "default"}
                  disabled={isLoading}
                />
                <Typography className={styles.darkText}>
                  {intl.formatMessage({
                    id: "account.enableTwoFactorAuthentication",
                  })}
                </Typography>
              </div>
            }
            middleSectionStyle={classes.thirdSectionStyle}
            bottomSectionStyle={classes.thirdSectionStyle}
          />
        }
      />
    </>
  );
};

export default ViewProfileDetails;
