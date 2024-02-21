import React, { useContext, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { TwoRow } from "../../core/layouts";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons/ActionAndCancelButtons";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import FileUpload from "../../components/FileUpload";
import UserInfo from "../UserInfo";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import {
  addUserNotification,
  updateUserNotification,
} from "../../globalContext/notification/notificationActions";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useDeleteImageApi from "../../services/api-services/Images/useDeleteImageApi";
import { EMAIL_REGEX, MOBILE_NO_REGEX } from "../../constant/regex";
import { FORM_STATES } from "../../constant/constant";
import { USERS } from "../../routes/routeNames";
import { classes } from "./UserDetailsContent.styles";
import styles from "./UserDetailsContent.module.scss";

const UserDetailsContent = ({
  fetchData,
  roleFetchDate,
  addNewUser,
  currentFormState,
  countryData,
  errorWhileGettingUsersData,
  getUserData,
  goBackToViewDetailsPage,
  isAccessValid,
  isEmailValid,
  isLoading,
  isMobileNumber,
  isUserNameValid,
  rolesData,
  setIsAccessValid,
  setIsEmailValid,
  setIsMobileNumberValid,
  setIsUserNameValid,
  updateUserData,
  updateUserDetails,
  userId,
  userData,
  viewUserData,
}) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [, setNotificationStateDispatch] = useContext(NotificationContext);
  const { handleDeleteImage } = useDeleteImageApi();
  const [deletedImage, setDeletedImage] = useState([]);
  const isActionBtnDisable =
    !userData?.name || !userData?.email || !userData?.mobile || !isAccessValid;

  const emailRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();

  const checkForIncorrectFields = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(MOBILE_NO_REGEX.test(`${userData?.mobile}`));
    setIsUserNameValid(userData.name?.trim()?.length !== 0);
    setIsAccessValid(userData.roles?.length !== 0);
    if (userData.name?.trim()?.length === 0) {
      nameRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (!MOBILE_NO_REGEX.test(`${userData?.mobile}`)) {
      phoneRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (!EMAIL_REGEX.test(userData?.email)) {
      emailRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleUpdateUserData = () => {
    checkForIncorrectFields();
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`${userData?.mobile}`) &&
      userData.name?.trim()?.length !== 0 &&
      userData.roles?.length !== 0
    ) {
      const payload = {
        name: userData?.name,
        email: userData?.email,
        mobile_number: userData?.mobile,
        roles: Array.isArray(userData.roles)
          ? userData.roles
          : Object.values(userData.roles).map((per) => per.id),
        permissions: Array.isArray(userData.permissions)
          ? userData.permissions
          : Object.values(userData.permissions).map((per) => per.id),
        is_two_factor: userData?.is_two_factor ? 1 : 0,
        mobile_country_code: userData?.mobile_prefix,
        status: userData?.status,
        profile_photo: userData.profile_photo,
      };

      updateUserDetails(userId, payload, () => {
        goBackToViewDetailsPage();
        setNotificationStateDispatch(updateUserNotification(true));
        deletedImage.map((item) => {
          handleDeleteImage({
            fileName: item,
          });
        });
      });
    }
  };

  const handleOnAddNewUser = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(MOBILE_NO_REGEX.test(`${userData?.mobile}`));
    setIsUserNameValid(userData.name?.trim()?.length !== 0);
    setIsAccessValid(userData.roles?.length !== 0);
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`${userData?.mobile}`) &&
      userData.name?.trim()?.length !== 0 &&
      userData.roles?.length !== 0
    ) {
      const payload = {
        name: userData.name,
        email: userData.email,
        mobile_number: userData.mobile,
        mobile_country_code: userData?.mobile_prefix,
        created_by: userProfileDetails?.userDetails?.id,
        roles: Array.isArray(userData.roles)
          ? userData.roles
          : Object.values(userData.roles).map((per) => per.id),
        permissions: Array.isArray(userData.permissions)
          ? userData.permissions
          : Object.values(userData.permissions).map((per) => per.id),
        is_two_factor: userData.is_two_factor ? 1 : 0,
        status: userData?.status,
        profile_photo: userData.profile_photo,
      };
      addNewUser(payload, () => {
        goBackToViewDetailsPage();
        setNotificationStateDispatch(addUserNotification(true));
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
                isNotAddable={currentFormState === FORM_STATES.EDITABLE}
                {...{
                  countryData,
                  setIsAccessValid,
                  rolesData,
                  updateUserData,
                  emailRef,
                  phoneRef,
                  nameRef,
                }}
                checkForCorrectEmail={() =>
                  setIsEmailValid(EMAIL_REGEX.test(userData?.email))
                }
                checkForMobileNumber={() =>
                  setIsMobileNumberValid(
                    MOBILE_NO_REGEX.test(`${userData?.mobile}`)
                  )
                }
                checkForUserName={() =>
                  setIsUserNameValid(userData.name?.trim()?.length)
                }
                name={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.name
                    : userData?.name
                }
                email={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.email
                    : userData?.email
                }
                mobileNo={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.mobile
                    : userData?.mobile
                }
                mobilePrefix={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.mobile_prefix
                    : userData?.mobile_prefix
                }
                date={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.date
                    : userData?.date || new Date().toISOString()
                }
                access={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.access
                    : userData?.access
                }
                permissions={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.permissions
                    : userData?.permissions
                }
                roles={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.roles
                    : userData?.roles
                }
                is_two_factor={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.is_two_factor
                    : userData?.is_two_factor
                }
                status={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.status
                    : userData?.status
                }
                isDateDisable
                userNameErrorMessage={
                  !isUserNameValid
                    ? intl.formatMessage({
                        id: "label.pleaseEnterUserName",
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
                  deletedImage,
                  setDeletedImage,
                  updateUserData,
                  isFormEditable: currentFormState !== FORM_STATES.VIEW_ONLY,
                }}
                name={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.name
                    : userData?.name
                }
                userProfilePic={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.profile_photo_url
                    : userData?.profile_photo_url
                }
                userImageName={
                  currentFormState === FORM_STATES.VIEW_ONLY
                    ? viewUserData?.profile_photo
                    : userData?.profile_photo
                }
                isNotAddable
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
  countryData: [],
  currentFormState: "",
  errorWhileGettingUsersData: "",
  getUserData: () => {},
  goBackToViewDetailsPage: () => {},
  isAccessValid: true,
  isEmailValid: true,
  isLoading: false,
  isMobileNumber: true,
  isUserNameValid: true,
  rolesData: {},
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
  countryData: PropTypes.array,
  currentFormState: PropTypes.string,
  errorWhileGettingUsersData: PropTypes.string,
  getUserData: PropTypes.func,
  goBackToViewDetailsPage: PropTypes.func,
  isAccessValid: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isUserNameValid: PropTypes.bool,
  rolesData: PropTypes.object,
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
