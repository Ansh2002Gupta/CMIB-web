import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Spin, Switch, Typography } from "antd";

import TwoRow from "../../core/layouts/TwoRow";

import ContentHeader from "../../containers/ContentHeader";
import FileUpload from "../../components/FileUpload";
import GreenButton from "../../components/GreenButton";
import UserInfo from "../../containers/UserInfo";
import edit from "../../themes/base/assets/images/edit.svg";
import styles from "./UserDetails.module.scss";
import useUserDetails from "../../core/hooks/useUserDetails";

const userId = 2;
const UserDetails = ({ userName }) => {
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
  console.log({ userData, isLoading, error, data });

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
    <TwoRow
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader
            headerText={userName}
            rightSection={
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
                  iconStyles={styles.btnIconStyles}
                  customStyle={styles.btnCustomStyles}
                />
              </div>
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
                isEditable={true}
                {...{ updateUserData }}
                name={userData?.name}
                email={userData?.email}
                mobileNo={userData?.mobile}
                date={userData?.date}
                access={userData?.access}
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
  );
};

UserDetails.defaultProps = {
  userName: "Nihil Sharma",
};

UserDetails.propTypes = {
  userName: PropTypes.string,
};

export default UserDetails;
