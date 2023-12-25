import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Button, Spin, Switch, Typography, message } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ActionAndCancelButtons from "../../components/ActionAndCancelButtons";
import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import FileUpload from "../../components/FileUpload";
import UserInfo from "../../containers/UserInfo";
import useAddNewUserApi from "../../services/api-services/Users/useAddNewUserApi";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import useUserDetails from "../../services/api-services/Users/useUserDetails";
import { setUserDetails } from "../../globalContext/userDetails/userDetailsActions";
import { UserDetailsContext } from "../../globalContext/userDetails/userDetailsProvider";
import edit from "../../themes/base/assets/images/edit.svg";
import { EMAIL_REGEX, MOBILE_NO_REGEX } from "../../constant/regex";
import { FORM_STATES } from "../../constant/constant";
import styles from "./UserDetails.module.scss";

const UserDetails = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();

  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    mobile_prefix: "",
    profile_photo: "",
    access: [],
    date: "",
    is_two_factor: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileNumber, setIsMobileNumberValid] = useState(true);
  const [userDetailsState, userDetailsDispatch] =
    useContext(UserDetailsContext);

  const {
    getUserData,
    isLoading,
    userData: data,
    error: errorWhileGettingUsersData,
  } = useUserDetails();

  const {
    errorWhileUpdatingUserData,
    updateUserDetails,
    isLoading: isUpdatingUserData,
    isSuccess,
    setErrorWhileUpdatingUserData,
  } = useUpdateUserDetailsApi();

  const {
    addNewUserData,
    errorWhileAddingNewUser,
    addNewUserApiStatus,
    addNewUser,
    isLoading: isAddingUser,
    isSuccess: isUserSuccessfullyAdded,
    setErrorWhileAddingNewUser,
  } = useAddNewUserApi();

  const currentFormState = userDetailsState?.formState;
  const currentUserName = userDetailsState?.userName;
  const userId = userDetailsState?.userId;

  const showErorrToUser = () => {
    messageApi.open({
      type: "error",
      content: intl.formatMessage({ id: "label.somethingWentWrong" }),
      style: {
        marginTop: "20vh",
      },
    });
  };

  const goBackToViewDetailsPage = () => {
    setErrorWhileUpdatingUserData("");
    userDetailsDispatch(setUserDetails({ formState: FORM_STATES.VIEW_ONLY }));
  };

  const goBackToManageUsersPage = () => {
    // TODO: Redirect the user to manage users screen.
    setErrorWhileUpdatingUserData("");
    userDetailsDispatch(setUserDetails({ formState: FORM_STATES.VIEW_ONLY }));
  };

  const handleUpdateUserData = () => {
    setIsEmailValid(EMAIL_REGEX.test(userData?.email));
    setIsMobileNumberValid(
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`)
    );
    if (
      EMAIL_REGEX.test(userData?.email) &&
      MOBILE_NO_REGEX.test(`+${userData?.mobile_prefix}${userData?.mobile}`)
    ) {
      updateUserDetails(userId, {
        name: userData?.name,
        email: userData?.email,
        mobile_number: userData?.mobile,
        created_by: Number(userId), // user id basically
        role: userData?.access,
        profile_photo: userData?.profile_photo,
        is_two_factor: userData?.is_two_factor ? 1 : 0,
      });
    }
  };

  const handleOnUserStatusChange = (value) => {
    updateUserDetails(userId, {
      status: value ? 1 : 0,
    });
    isSuccess &&
      setActive(() => {
        return value;
      });
  };

  const updateUserData = (key, value) => {
    key === "email" && setIsEmailValid(true);
    key === "mobile" && setIsMobileNumberValid(true);
    setErrorWhileUpdatingUserData("");
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const getHeaderText = () => {
    if (currentFormState === FORM_STATES.EDITABLE) {
      return currentUserName;
    }
    if (currentFormState === FORM_STATES.VIEW_ONLY) {
      return intl.formatMessage({ id: "label.editUserDetails" });
    }
    return intl.formatMessage({ id: "label.addNewUsers" });
  };

  const handleOnAddNewUser = () => {
    addNewUser({
      name: userData.name,
      email: userData.email,
      mobile_number: userData.mobile,
      // profile_photo: userData.profile_photo,
      created_by: 1, // from where I will get this id?
      role: userData.access,
      is_two_factor: userData.is_two_factor,
    });
  };

  useEffect(() => {
    if (errorWhileUpdatingUserData || errorWhileAddingNewUser) {
      showErorrToUser();
    }
  }, [errorWhileUpdatingUserData, errorWhileAddingNewUser]);

  useEffect(() => {
    if (isSuccess) {
      goBackToViewDetailsPage();
    }
  }, [isSuccess]);

  useEffect(() => {
    !!data &&
      setUserData({
        name: data?.name || "",
        email: data?.email || "",
        mobile: data?.mobile_number || "",
        mobile_prefix: "91",
        profile_photo: data?.profile_photo || "",
        access: data?.role?.map((item) => item?.name) || "",
        date: data?.created_at || "",
        is_two_factor: data?.is_two_factor ? true : false,
      });
  }, [data]);

  useEffect(() => {
    if (userId) {
      getUserData(userDetailsState?.userId);
    }
  }, [userId]);

  useEffect(() => {
    return () => {
      setActive(false);
      setIsEmailValid(true);
      setIsMobileNumberValid(true);
    };
  }, []);

  // TODO: remove console.log
  console.log({
    isLoading,
    data,
    errorWhileGettingUsersData,
    errorWhileUpdatingUserData,
    isUpdatingUserData,
    isSuccess,
  });

  return (
    <div className={styles.container}>
      {contextHolder}
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
                            className={active ? styles.switchBgColor : ""}
                            onClick={handleOnUserStatusChange}
                            disabled={isUpdatingUserData}
                            checked={active}
                          />
                          <Typography className={styles.text}>
                            {intl.formatMessage({
                              id: `label.${active ? "active" : "inactive"}`,
                            })}
                          </Typography>
                        </div>
                        <CustomButton
                          isBtnDisable={isUpdatingUserData}
                          btnText={intl.formatMessage({ id: "label.edit" })}
                          iconUrl={edit}
                          onClick={() =>
                            userDetailsDispatch(
                              setUserDetails({ editable: true })
                            )
                          }
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
                    shouldShowDatePickerOption={
                      currentFormState !== FORM_STATES.EMPTY
                    }
                    {...{ updateUserData }}
                    name={userData?.name}
                    email={userData?.email}
                    mobileNo={userData?.mobile}
                    mobilePrefix={userData?.mobile_prefix}
                    date={userData?.date}
                    access={userData?.access}
                    is_two_factor={userData?.is_two_factor}
                    isDateDisable
                  />
                  <FileUpload
                    {...{
                      updateUserData,
                      isFormEditable:
                        currentFormState !== FORM_STATES.VIEW_ONLY,
                    }}
                    userProfilePic={userData.profile_photo}
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
        !isUpdatingUserData && (
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
