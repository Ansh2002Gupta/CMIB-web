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
    name: "",
    email: "",
    mobile: "",
    access: "",
    date: "",
  });

  const updateUserData = (key, value) => {
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    setUserData({
      name: data?.name || "",
      email: data?.email || "",
      mobile: data?.mobile_number || "",
      access: data?.role || "",
      date: data?.created_at || "",
    });
  }, [data]);

  useEffect(() => {
    getUserData(userId);
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
            {!isLoading && !error && !!data && (
              <div className={styles.bottomContainer}>
                <UserInfo
                  isEditable={isFormEditable}
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
            {isLoading && (
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
            {error && (
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
                  description={error}
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
          <Button className={styles.cancelBtn}>Cancel</Button>
          <GreenButton customStyle={styles.saveBtn} btnText={"Save Changes"} />
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
