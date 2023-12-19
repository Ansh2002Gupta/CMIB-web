import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button, Spin, Switch, Typography } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import FileUpload from "../../components/FileUpload";
import GreenButton from "../../components/GreenButton";
import UserInfo from "../../containers/UserInfo";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useUpdateUserDetailsApi from "../../core/hooks/useUpdateUserDetailsApi";
import useUserDetails from "../../core/hooks/useUserDetails";
import edit from "../../themes/base/assets/images/edit.svg";
import styles from "./UserDetails.module.scss";

const UserDetails = ({ userName }) => {
  const [searchParams] = useSearchParams();
  const { navigateScreen: navigate } = useNavigateScreen();
  const isFormEditable = searchParams?.get("edit") === "true";
  const userId = searchParams?.get("userId");
  const [active, setActive] = useState(false);
  const { getUserData, isLoading, userData: data, error } = useUserDetails();
  const [userData, setUserData] = useState({
    name: "nihil",
    email: "nihil@gmail.com",
    mobile: "101010101010",
    mobile_prefix: "91",
    profile_photo: "ddddddddddddddddddddddddddddddd",
    access: "All",
    date: "11/12/2020",
  });
  const {
    errorWhileUpdatingUserData,
    userDetails,
    updateUserDetails,
    isError,
    isLoading: isUpdatingUserData,
    isSuccess,
    apiStatus,
    setErrorWhileUpdatingUserData,
  } = useUpdateUserDetailsApi();

  const goBackToViewDetailsPage = () => {
    setErrorWhileUpdatingUserData("");
    navigate(`/view-user-details?userId=${userId}&edit=false`);
  };

  const handleUpdateUserData = () => {
    //neccesary checks for input
    updateUserDetails(userId, {
      name: userData?.name,
      email: userData?.email,
      password: "123!@#QWEq",
      mobile_number: userData?.mobile,
      created_by: userId, // user id basically
      role: userData?.access,
      profile_photo: userData?.profile_photo,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      goBackToViewDetailsPage();
    }
  }, [isSuccess]);

  const updateUserData = (key, value) => {
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // useEffect(() => {
  //   setUserData({
  //     name: data?.name || "",
  //     email: data?.email || "",
  //     mobile: data?.mobile_number || "",
  //     mobile_prefix: data?.mobile_number || "",
  //     profile_photo: data?.profile_photo || "",
  //     access: data?.role || "",
  //     date: data?.created_at || "",
  //   });
  // }, [data]);

  useEffect(() => {
    // getUserData(userId); // un-comment it later
  }, [isFormEditable]);

  useEffect(() => {
    return () => {
      setActive(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <TwoRow
        topSection={
          <div className={styles.headerContainer}>
            <ContentHeader
              headerText={!isFormEditable ? userName : "Edit User Details"}
              rightSection={
                <>
                  {!isFormEditable ? (
                    <div className={styles.activeSwitchAndBtnContainer}>
                      <div className={styles.switchAndTextContainer}>
                        <Switch
                          className={active ? styles.switchBgColor : ""}
                          onChange={() => setActive((prev) => !prev)}
                        />
                        <Typography className={styles.text}>
                          {active ? "Active" : "In-active"}
                        </Typography>
                      </div>
                      <GreenButton
                        btnText="Edit"
                        iconUrl={edit}
                        onClick={() =>
                          navigate(
                            `/view-user-details?userId=${userId}&edit=true`
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
        }
        isBottomFillSpace
        bottomSection={
          <>
            {(!isLoading &&
              !error &&
              !!data &&
              !isUpdatingUserData &&
              !errorWhileUpdatingUserData) || true && (
                <div className={styles.bottomContainer}>
                  <UserInfo
                    // isEditable={isFormEditable}
                    isEditable={false}
                    {...{ updateUserData }}
                    name={userData?.name}
                    email={userData?.email}
                    mobileNo={userData?.mobile}
                    date={userData?.date}
                    access={userData?.access}
                    isDateDisable
                  />
                  <FileUpload />
                </div>
              )}
            {(isLoading || isUpdatingUserData) && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            )}
            {(error || errorWhileUpdatingUserData) && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Alert
                  message="Error"
                  description={error || errorWhileUpdatingUserData}
                  type="error"
                  showIcon
                />
              </div>
            )}
          </>
        }
      />
      {isFormEditable && (
        <div className={styles.saveAndCancelBtnContainer}>
          <Button
            className={styles.cancelBtn}
            onClick={goBackToViewDetailsPage}
          >
            Cancel
          </Button>
          <GreenButton
            customStyle={styles.saveBtn}
            btnText={"Save Changes"}
            onClick={handleUpdateUserData}
          />
        </div>
      )}
    </div>
  );
};

UserDetails.defaultProps = {
  userName: "Nihil Sharma",
};

UserDetails.propTypes = {
  userName: PropTypes.string,
};

export default UserDetails;
