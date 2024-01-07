import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Alert, Button, Spin, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton";
import FileUpload from "../../components/FileUpload";
import UserInfo from "../UserInfo";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { EMAIL_REGEX, MOBILE_NO_REGEX } from "../../constant/regex";
import { FORM_STATES } from "../../constant/constant";
import { USERS } from "../../routes/routeNames";
import { classes } from "./UserDetailsContent.styles";
import styles from "./UserDetailsContent.module.scss";

const UserDetailsContent = ({
  addNewUser,
  currentFormState,
  errorWhileGettingUsersData,
  getUserData,
  goBackToViewDetailsPage,
  isAccessValid,
  isEmailValid,
  isLoading,
  isMobileNumber,
  isUserNameValid,
  setIsAccessValid,
  setIsEmailValid,
  setIsMobileNumberValid,
  setIsUserNameValid,
  updateUserData,
  updateUserDetails,
  userId,
  userData,
}) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();

  const isSavedBtnDisable =
    !userData?.name ||
    !userData?.email ||
    !userData?.mobile ||
    !userData?.access?.length;

  const handleUpdateUserData = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`)
    );
    setIsUserNameValid(userData.name?.trim()?.length !== 0);
    setIsAccessValid(userData.access?.length !== 0);
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`) &&
      userData.name?.trim()?.length !== 0 &&
      userData.access?.length !== 0
    ) {
      const payload = {
        name: userData?.name,
        email: userData?.email,
        mobile_number: userData?.mobile,
        role: userData?.access,
        is_two_factor: userData?.is_two_factor ? 1 : 0,
      };
      if (userData?.profile_photo) {
        payload["profile_photo"] = userData.profile_photo.file;
      }
      updateUserDetails(userId, payload, () => {
        navigate(USERS);
      });
    }
  };

  const handleOnAddNewUser = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`)
    );
    setIsUserNameValid(userData.name?.trim()?.length !== 0);
    setIsAccessValid(userData.access?.length !== 0);
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`) &&
      userData.name?.trim()?.length !== 0 &&
      userData.access?.length !== 0
    ) {
      const payload = {
        name: userData.name,
        email: userData.email,
        mobile_number: userData.mobile,
        created_by: 1, // from where I will get this id?
        role: userData.access,
        is_two_factor: userData.is_two_factor ? 1 : 0,
      };
      if (userData?.profile_photo) {
        payload["profile_photo"] = userData.profile_photo.file;
      }
      addNewUser(payload, () => {
        goBackToViewDetailsPage();
      });
    }
  };

  const handleOnSubmit = () => {
    FORM_STATES.EDITABLE === currentFormState && handleUpdateUserData();
    FORM_STATES.EMPTY === currentFormState && handleOnAddNewUser();
  };

  return (
    <TwoRow
      className={styles.container}
      topSection={
        <>
          {!isLoading && !errorWhileGettingUsersData && (
            <div className={styles.bottomContainer}>
              <UserInfo
                emailErrorMessage={
                  !isEmailValid
                    ? intl.formatMessage({
                        id: "label.invalidEmail",
                      })
                    : ""
                }
                mobileErrorMessage={
                  !isMobileNumber
                    ? intl.formatMessage({
                        id: "label.invalidMobile",
                      })
                    : ""
                }
                isEditable={currentFormState !== FORM_STATES.VIEW_ONLY}
                {...{ updateUserData }}
                name={userData?.name}
                email={userData?.email}
                mobileNo={userData?.mobile}
                mobilePrefix={userData?.mobile_prefix}
                date={userData?.date || new Date().toLocaleDateString()}
                access={userData?.access}
                is_two_factor={userData?.is_two_factor}
                isDateDisable
                userNameErrorMessage={
                  !isUserNameValid
                    ? intl.formatMessage({
                        id: "label.userNameLeftEmpty",
                      })
                    : ""
                }
                userAccessErrorMessage={
                  !isAccessValid
                    ? intl.formatMessage({
                        id: "label.notValidUserAccess",
                      })
                    : ""
                }
              />
              <FileUpload
                {...{
                  updateUserData,
                  isFormEditable: currentFormState !== FORM_STATES.VIEW_ONLY,
                }}
                userProfilePic={userData?.profile_photo_url}
                userImageName={userData?.profile_photo?.file?.name}
              />
            </div>
          )}
          {isLoading && (
            <div className={styles.loaderContainer}>
              <Spin size="large" />
            </div>
          )}
          {errorWhileGettingUsersData && (
            <div className={styles.errorContainer}>
              <Alert
                message={
                  <Typography className={styles.errorText}>
                    {intl.formatMessage({ id: "label.error" })}
                  </Typography>
                }
                description={
                  <div className={styles.apiFailedErrorContainer}>
                    <Typography className={styles.errorText}>
                      {errorWhileGettingUsersData}
                    </Typography>
                    <Button
                      onClick={() => getUserData(userId)}
                      className={styles.tryAgainButton}
                    >
                      {intl.formatMessage({ id: "label.tryAgain" })}
                    </Button>
                  </div>
                }
                type="error"
                showIcon
              />
            </div>
          )}
        </>
      }
      bottomSectionStyle={classes.bottomSectionStyles}
      isBottomFillSpace
      bottomSection={
        <>
          {currentFormState !== FORM_STATES.VIEW_ONLY && !isLoading && (
            <div className={styles.saveAndCancelBtnContainer}>
              <Button
                className={styles.cancelBtn}
                onClick={goBackToViewDetailsPage}
              >
                {intl.formatMessage({ id: "label.cancel" })}
              </Button>
              <CustomButton
                customStyle={styles.saveBtn}
                btnText={intl.formatMessage({
                  id: `label.${
                    currentFormState === FORM_STATES.EDITABLE
                      ? "saveChanges"
                      : "add"
                  }`,
                })}
                onClick={handleOnSubmit}
                isBtnDisable={isSavedBtnDisable}
              />
            </div>
          )}
        </>
      }
    />
  );
};

UserDetailsContent.defaultProps = {
  currentFormState: "",
  errorWhileGettingUsersData: "",
  getUserData: () => {},
  goBackToViewDetailsPage: () => {},
  isAccessValid: true,
  isEmailValid: true,
  isLoading: false,
  isMobileNumber: true,
  isUserNameValid: true,
  setIsAccessValid: () => {},
  setIsEmailValid: () => {},
  setIsMobileNumberValid: () => {},
  setIsUserNameValid: () => {},
  updateUserData: () => {},
  updateUserDetails: () => {},
  userId: 0,
  userData: {},
};

UserDetailsContent.propTypes = {
  currentFormState: PropTypes.string,
  errorWhileGettingUsersData: PropTypes.string,
  getUserData: PropTypes.func,
  goBackToViewDetailsPage: PropTypes.func,
  isAccessValid: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isUserNameValid: PropTypes.bool,
  setIsAccessValid: PropTypes.func,
  setIsEmailValid: PropTypes.func,
  setIsMobileNumberValid: PropTypes.func,
  setIsUserNameValid: PropTypes.func,
  updateUserData: PropTypes.func,
  updateUserDetails: PropTypes.func,
  userId: PropTypes.number,
  userData: PropTypes.object,
};

export default UserDetailsContent;
