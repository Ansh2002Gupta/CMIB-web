import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
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

  const isActionBtnDisable =
    !userData?.name || !userData?.email || !userData?.mobile || !isAccessValid;

  const handleUpdateUserData = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(MOBILE_NO_REGEX.test(`${userData?.mobile}`));
    setIsUserNameValid(userData.name?.trim()?.length !== 0);
    setIsAccessValid(userData.access?.length !== 0);
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`${userData?.mobile}`) &&
      userData.name?.trim()?.length !== 0 &&
      userData.access?.length !== 0
    ) {
      const payload = {
        name: userData?.name,
        email: userData?.email,
        mobile_number: userData?.mobile,
        roles: userData?.access,
        permissions: userData.permissions,
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
    setIsMobileNumberValid(MOBILE_NO_REGEX.test(`${userData?.mobile}`));
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
        created_by: 1, // TODO: Get this id from get-Logged-In-User-details API (once it is integrated)
        roles: userData.access,
        permissions: userData.permissions,
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
                {...{ updateUserData, setIsAccessValid }}
                name={userData?.name}
                email={userData?.email}
                mobileNo={userData?.mobile}
                mobilePrefix={userData?.mobile_prefix}
                date={userData?.date || new Date().toISOString()}
                access={userData?.access}
                permissions={userData?.permissions}
                roles={userData?.roles}
                is_two_factor={userData?.is_two_factor}
                status={userData?.status}
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
                shouldShowDatePickerOption={true}
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
              <ErrorMessageBox
                onRetry={() => getUserData(userId)}
                errorHeading={intl.formatMessage({ id: "label.error" })}
                errorText={errorWhileGettingUsersData}
              />
            </div>
          )}
        </>
      }
      isTopFillSpace
      bottomSectionStyle={classes.bottomSectionStyles}
      bottomSection={
        <>
          {currentFormState !== FORM_STATES.VIEW_ONLY &&
            !isLoading &&
            !errorWhileGettingUsersData && (
              <ActionAndCancelButtons
                actionBtnText={intl.formatMessage({
                  id: `label.${
                    currentFormState === FORM_STATES.EDITABLE
                      ? "saveChanges"
                      : "add"
                  }`,
                })}
                cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
                onActionBtnClick={handleOnSubmit}
                isActionBtnDisable={isActionBtnDisable}
                onCancelBtnClick={goBackToViewDetailsPage}
              />
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
  userId: "",
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
  userId: PropTypes.string,
  userData: PropTypes.object,
};

export default UserDetailsContent;
