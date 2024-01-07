import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow";

import UserDetailsContent from "../../containers/UserDetailsContent/UserDetailsContent";
import UserDetailsHeader from "../../containers/UserDetailsHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import useUserDetails from "../../services/api-services/Users/useUserDetails";
import { FORM_STATES, NOTIFICATION_TYPES } from "../../constant/constant";
import { USERS } from "../../routes/routeNames";

const UserDetails = () => {
  const { userId } = useParams();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [searchParams] = useSearchParams();
  const currentFormState = searchParams.get("mode") || FORM_STATES.EMPTY;

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileNumber, setIsMobileNumberValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isAccessValid, setIsAccessValid] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    mobile_prefix: "91",
    profile_photo: null,
    profile_photo_url: "",
    access: [],
    date: "",
    is_two_factor: false,
    status: 0,
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  // const { showNotification, notificationContextHolder } = useShowNotification();
  const {
    getUserData,
    isLoading,
    userData: userAccountInfo,
    error: errorWhileGettingUsersData,
  } = useUserDetails();

  const goBackToViewDetailsPage = () => {
    setErrorWhileUpdatingUserData("");
    navigate(USERS);
  };

  const {
    errorWhileUpdatingUserData,
    updateUserDetails,
    isLoading: isUpdatingUserData,
    setErrorWhileUpdatingUserData,
  } = useUpdateUserDetailsApi();

  const isFormEditable = userDetailsState?.editable;
  const currentUserName = userDetailsState?.userName;
  // const userId = userDetailsState?.userId;

  const showErorrToUser = () => {
    messageApi.open({
      type: "error",
      content: intl.formatMessage({ id: "label.somethingWentWrong" }),
      style: {
        marginTop: "20vh",
      },
    });
  };

  // const goBackToViewDetailsPage = () => {
  //   setErrorWhileUpdatingUserData("");
  //   userDetailsDispatch(setUserDetails({ editable: false }));
  // };

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
    if (isSuccess) {
      goBackToViewDetailsPage();
    }
  }, [isSuccess]);

  useEffect(() => {
    errorWhileUpdatingUserData &&
      showNotification(errorWhileUpdatingUserData, NOTIFICATION_TYPES.ERROR);
  }, [errorWhileUpdatingUserData]);

  useEffect(() => {
    !!userAccountInfo &&

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
  }, [userId]);

  useEffect(() => {
    return () => {
      setIsEmailValid(true);
      setIsMobileNumberValid(true);
      setIsAccessValid(true);
      setIsUserNameValid(true);
      setUserData({
        name: "",
        email: "",
        mobile: "",
        mobile_prefix: "91",
        profile_photo: null,
        profile_photo_url: "",
        access: [],
        date: "",
        is_two_factor: false,
        status: 0,
      });
    };
  }, []);

  return (
    <>
      {notificationContextHolder}
      <TwoRow
        topSection={
          !isAddingUser &&
          !errorWhileGettingUsersData &&
          !isLoading && (
            <UserDetailsHeader
              {...{
                userData,
                isUpdatingUserData,
                updateUserDetails,
                currentFormState,
                updateUserData,
                userId,
              }}
            />
          )
        }
        isBottomFillSpace
        bottomSection={
          <UserDetailsContent
            {...{
              currentFormState,
              updateUserData,
              userData,
              errorWhileGettingUsersData,
              getUserData,
              updateUserDetails,
              userId,
              goBackToViewDetailsPage,
              isEmailValid,
              setIsEmailValid,
              isMobileNumber,
              setIsMobileNumberValid,
              isUserNameValid,
              setIsUserNameValid,
              isAccessValid,
              setIsAccessValid,
            }}
            isLoading={isLoading || isUpdatingUserData}
          />
        }
      />
    </>
  );
};

export default UserDetails;
