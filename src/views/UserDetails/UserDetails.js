import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow";

import UserDetailsContent from "../../containers/UserDetailsContent/UserDetailsContent";
import UserDetailsHeader from "../../containers/UserDetailsHeader";
import useAddNewUserApi from "../../services/api-services/Users/useAddNewUserApi";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import useFetch from "../../core/hooks/useFetch";
import useUpdateUserDetailsApi from "../../services/api-services/Users/useUpdateUserDetailsApi";
import useUserDetails from "../../services/api-services/Users/useUserDetails";
import {
  CONTROL_MODULE_ID,
  FORM_STATES,
  NOTIFICATION_TYPES,
} from "../../constant/constant";
import {
  ADMIN_ROUTE,
  CORE_COUNTRIES,
  ROLES_PERMISSION,
} from "../../constant/apiEndpoints";
import { USERS } from "../../routes/routeNames";

const UserDetails = () => {
  const intl = useIntl();
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
    mobile_prefix: "+91",
    profile_photo: "",
    profile_photo_url: "",
    access: [],
    roles: [],
    permissions: [],
    date: "",
    is_two_factor: false,
    status: 0,
  });

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { fetchData, data: countryData } = useFetch({
    url: CORE_COUNTRIES,
    otherOptions: {
      skipApiCallOnMount: currentFormState !== FORM_STATES.EMPTY,
    },
  });

  const { data: rolesData, fetchData: roleFetchDate } = useFetch({
    url: ADMIN_ROUTE + ROLES_PERMISSION,
    otherOptions: {
      skipApiCallOnMount: currentFormState !== FORM_STATES.EMPTY,
    },
  });

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

  const {
    errorWhileAddingNewUser,
    addNewUser,
    isLoading: isAddingUser,
    isSuccess: isNewUserSuccessfullyAdded,
  } = useAddNewUserApi();

  const updateUserData = (key, value) => {
    key === "email" && setIsEmailValid(true);
    key === "mobile" && setIsMobileNumberValid(true);
    key === "access" && setIsAccessValid(true);
    key === "name" && setIsUserNameValid(true);
    setErrorWhileUpdatingUserData("");
    if (key === "mobile") {
      value = value;
    }
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
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

  const loadDataOfUser = (userAccountInfo) => {
    if (!!userAccountInfo) {
      const imageParts = userAccountInfo?.profile_photo?.split("/");
      const imageName = imageParts?.pop();
      setUserData({
        name: userAccountInfo?.name || "",
        email: userAccountInfo?.email || "",
        mobile: userAccountInfo?.mobile_number || "",
        mobile_prefix: userAccountInfo?.mobile_country_code || "+91",
        profile_photo_url: userAccountInfo?.profile_photo || "",
        profile_photo: imageName || "",
        access:
          Object.entries(userAccountInfo?.roles || {})?.map(
            ([index, item]) => item?.id
          ) || [],
        roles: userAccountInfo?.roles || [],
        permissions:
          Object.entries(userAccountInfo?.permissions || {})?.map(
            ([index, item]) => item?.id
          ) || [],
        date: userAccountInfo?.created_at || "",
        is_two_factor: userAccountInfo?.is_two_factor ? true : false,
        status: userAccountInfo?.status,
      });
    }
  };

  useEffect(() => {
    if (userId) {
      getUserData({
        userId,
        onSuccessCallBack: (userAccountInfo) => {
          loadDataOfUser(userAccountInfo);
          fetchData({ queryParamsObject: {} });
          roleFetchDate({ queryParamsObject: {} });
        },
        onErrorCallBack: (errMessage) => {
          showNotification(errMessage);
        },
      });
    }
  }, []);

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
        mobile_prefix: "+91",
        profile_photo: "null",
        profile_photo_url: "",
        access: [],
        permissions: [],
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
              fetchData,
              roleFetchDate,
              countryData,
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
              rolesData,
              setIsMobileNumberValid,
              isUserNameValid,
              setIsUserNameValid,
              isAccessValid,
              setIsAccessValid,
              addNewUser,
            }}
            isLoading={isLoading || isUpdatingUserData || isAddingUser}
          />
        }
      />
    </>
  );
};

export default UserDetails;
