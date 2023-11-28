import React from "react";
import ProfileIcon from "../../themes/primary/assets/profile.png";
import Styles from "./profile.module.scss";

const Profile = () => {
  return <img src={ProfileIcon} alt="profile" className={Styles.profileIcon} />;
};

export default Profile;
