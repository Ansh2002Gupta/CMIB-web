import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Button, Spin, Switch, Typography, message } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import CustomButton from "../../components/CustomButton";
import FileUpload from "../../components/FileUpload";
import UserInfo from "../../containers/UserInfo";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import useUserDetails from "../../services/api-services/Users/useUserDetails";
import {
  setUserDetails,
} from "../../globalContext/userDetails/userDetailsActions";
import { UserDetailsContext } from "../../globalContext/userDetails/userDetailsProvider";
import edit from "../../themes/base/assets/images/edit.svg";
import { EMAIL_REGEX, MOBILE_NO_REGEX } from "../../constant/regex";
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

  const isFormEditable = userDetailsState?.editable;
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
    userDetailsDispatch(setUserDetails({ editable: false }));
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

  useEffect(() => {
    if (errorWhileUpdatingUserData) {
      showErorrToUser();
    }
  }, [errorWhileUpdatingUserData]);

  useEffect(() => {
    if (isSuccess) {
      goBackToViewDetailsPage();
    }
  }, [isSuccess]);

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

  return (
    <div className={styles.container}>
      {contextHolder}
      <TwoRow
        topSection={
          !errorWhileGettingUsersData &&
          !isLoading && (
            <div className={styles.headerContainer}>
              <ContentHeader
                headerText={
                  !isFormEditable
                    ? currentUserName
                    : intl.formatMessage({ id: "label.editUserDetails" })
                }
                rightSection={
                  <>
                    {!isFormEditable ? (
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
              !errorWhileGettingUsersData &&
              !!data &&
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
                    isEditable={isFormEditable}
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
                      isFormEditable,
                    }}
                    userProfilePic={userData.profile_photo}
                  />
                </div>
              )}
            {(isLoading || isUpdatingUserData) && (
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
      {isFormEditable && !isLoading && !isUpdatingUserData && (
        <div className={styles.saveAndCancelBtnContainer}>
          <Button
            className={styles.cancelBtn}
            onClick={goBackToViewDetailsPage}
          >
            {intl.formatMessage({ id: "label.cancel" })}
          </Button>
          <CustomButton
            customStyle={styles.saveBtn}
            btnText={intl.formatMessage({ id: "label.saveChanges" })}
            onClick={handleUpdateUserData}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
