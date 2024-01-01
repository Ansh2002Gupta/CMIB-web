import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Alert, Button, Spin, Switch, Typography } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import FileUpload from "../../components/FileUpload";
import UserInfo from "../../containers/UserInfo";
import useAddNewUserApi from "../../services/api-services/Users/useAddNewUserApi";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import useUserDetails from "../../services/api-services/Users/useUserDetails";
import { ReactComponent as Edit } from "../../themes/base/assets/images/edit.svg";
import { EMAIL_REGEX, MOBILE_NO_REGEX } from "../../constant/regex";
import { FORM_STATES, NOTIFICATION_TYPES } from "../../constant/constant";
import { MANAGE_USERS, USERS } from "../../routes/routeNames";
import styles from "./UserDetails.module.scss";

const UserDetails = ({ currentFormState }) => {
  const intl = useIntl();
  const { userId } = useParams();
  const { navigateScreen: navigate } = useNavigateScreen();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    mobile_prefix: "91",
    profile_photo: "",
    profile_photo_url: "",
    access: [],
    date: "",
    is_two_factor: false,
    status: 0,
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileNumber, setIsMobileNumberValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isAccessValid, setIsAccessValid] = useState(true);

  const { showNotification, notificationContextHolder } = useShowNotification();
  const {
    getUserData,
    isLoading,
    userData: userAccountInfo,
    error: errorWhileGettingUsersData,
  } = useUserDetails();

  const {
    errorWhileUpdatingUserData,
    updateUserDetails,
    isLoading: isUpdatingUserData,
    isSuccess: isUserUpdatedSuccesfully,
    setErrorWhileUpdatingUserData,
  } = useUpdateUserDetailsApi();

  const {
    errorWhileAddingNewUser,
    addNewUser,
    isLoading: isAddingUser,
    isSuccess: isNewUserSuccessfullyAdded,
  } = useAddNewUserApi();

  const goBackToViewDetailsPage = () => {
    setErrorWhileUpdatingUserData("");
    navigate(USERS + `/view/${userId}`);
  };

  const goBackToManageUsersPage = () => {
    setErrorWhileUpdatingUserData("");
    navigate(MANAGE_USERS);
  };

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
        role: userData?.access?.map((item) => item.id)?.join(","),
        is_two_factor: userData?.is_two_factor ? 1 : 0,
      };
      if (userData?.profile_photo) {
        payload["profile_photo"] = userData.profile_photo.file;
      }
      updateUserDetails(userId, payload);
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
        role: userData.access?.map((item) => item.id)?.join(","),
        is_two_factor: userData.is_two_factor ? 1 : 0,
      };
      if (userData?.profile_photo) {
        payload["profile_photo"] = userData.profile_photo?.file;
      }
      addNewUser(payload);
    }
  };

  const handleOnUserStatusChange = (value) => {
    updateUserDetails(userId, {
      status: value ? 1 : 0,
    });
  };

  const updateUserData = (key, value) => {
    key === "email" && setIsEmailValid(true);
    key === "mobile" && setIsMobileNumberValid(true);
    key === "access" && setIsAccessValid(true);
    key === "name" && setIsUserNameValid(true);
    setErrorWhileUpdatingUserData("");
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const getHeaderText = () => {
    if (currentFormState === FORM_STATES.VIEW_ONLY) {
      return userData?.name;
    }
    if (currentFormState === FORM_STATES.EDITABLE) {
      return intl.formatMessage({ id: "label.editUserDetails" });
    }
    return intl.formatMessage({ id: "label.addNewUsers" });
  };

  useEffect(() => {
    errorWhileUpdatingUserData &&
      showNotification(errorWhileUpdatingUserData, NOTIFICATION_TYPES.ERROR);
    errorWhileAddingNewUser &&
      showNotification(errorWhileAddingNewUser, NOTIFICATION_TYPES.ERROR);
    isNewUserSuccessfullyAdded &&
      showNotification(
        intl.formatMessage({ id: "label.userCreatedSuccessfully" }),
        NOTIFICATION_TYPES.SUCCESS
      );
  }, [
    errorWhileUpdatingUserData,
    errorWhileAddingNewUser,
    isNewUserSuccessfullyAdded,
  ]);

  useEffect(() => {
    if (isUserUpdatedSuccesfully) {
      goBackToViewDetailsPage();
    }
  }, [isUserUpdatedSuccesfully]);

  useEffect(() => {
    userAccountInfo &&
      setUserData({
        name: userAccountInfo?.name || "",
        email: userAccountInfo?.email || "",
        mobile: userAccountInfo?.mobile_number || "",
        mobile_prefix: "91",
        profile_photo_url: userAccountInfo?.profile_photo || "",
        profile_photo: null,
        access: userAccountInfo?.role?.map((item) => item?.name) || "",
        date: userAccountInfo?.created_at || "",
        is_two_factor: userAccountInfo?.is_two_factor ? true : false,
        status: userAccountInfo?.status,
      });
  }, [userAccountInfo]);

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId, currentFormState, isUserUpdatedSuccesfully]);

  useEffect(() => {
    return () => {
      setIsEmailValid(true);
      setIsMobileNumberValid(true);
    };
  }, []);

  return (
    <div className={styles.container}>
      {notificationContextHolder}
      <TwoRow
        topSection={
          !isAddingUser &&
          !errorWhileGettingUsersData &&
          !isLoading && (
            <div className={styles.headerContainer}>
              <ContentHeader
                headerText={getHeaderText()}
                rightSection={
                  <>
                    {currentFormState === FORM_STATES.VIEW_ONLY ? (
                      <div className={styles.activeSwitchAndBtnContainer}>
                        <div className={styles.switchAndTextContainer}>
                          <Switch
                            className={
                              userData?.status ? styles.switchBgColor : ""
                            }
                            onClick={handleOnUserStatusChange}
                            disabled={isUpdatingUserData}
                            checked={userData?.status}
                          />
                          <Typography className={styles.text}>
                            {intl.formatMessage({
                              id: `label.${
                                userData?.status ? "active" : "inactive"
                              }`,
                            })}
                          </Typography>
                        </div>
                        <CustomButton
                          isBtnDisable={isUpdatingUserData}
                          btnText={intl.formatMessage({ id: "label.edit" })}
                          IconElement={Edit}
                          onClick={() => navigate(USERS + `/edit/${userId}`)}
                          iconStyles={styles.btnIconStyles}
                          customStyle={styles.btnCustomStyles}
                        />
                      </div>
                    ) : null}
                  </>
                }
              />
            </div>
          )
        }
        isBottomFillSpace
        bottomSection={
          <>
            {!isLoading &&
              !isAddingUser &&
              !errorWhileGettingUsersData &&
              !isUpdatingUserData && (
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
                    isDateDisable
                    shouldShowDatePickerOption={false}
                  />
                  <FileUpload
                    {...{
                      updateUserData,
                      isFormEditable:
                        currentFormState !== FORM_STATES.VIEW_ONLY,
                    }}
                    userProfilePic={userData.profile_photo_url}
                    userImageName={userData.profile_photo?.file?.name}
                  />
                </div>
              )}
            {(isLoading || isUpdatingUserData || isAddingUser) && (
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
      />
      {currentFormState !== FORM_STATES.VIEW_ONLY &&
        !isLoading &&
        !isUpdatingUserData &&
        !isAddingUser && (
          <ActionAndCancelButtons
            cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
            actionBtnText={intl.formatMessage({
              id: `label.${
                currentFormState === FORM_STATES.EDITABLE
                  ? "saveChanges"
                  : "add"
              }`,
            })}
            onActionBtnClick={
              currentFormState === FORM_STATES.EDITABLE
                ? handleUpdateUserData
                : handleOnAddNewUser
            }
            onCancelBtnClick={
              currentFormState === FORM_STATES.EDITABLE
                ? goBackToViewDetailsPage
                : goBackToManageUsersPage
            }
          />
        )}
    </div>
  );
};

export default UserDetails;
