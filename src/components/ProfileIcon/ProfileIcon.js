import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Image } from "antd";

import styles from "./ProfileIcon.module.scss";

const ProfileIcon = ({
  firstName,
  icon,
  iconType,
  imageContainerStyle,
  lastName,
  onClick,
  profileImage,
  profileImageStyle,
  showEditModal,
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fName, lName) => {
    if (fName && lName) {
      return `${fName?.charAt(0)}${lName?.charAt(0)}`;
    }
    return fName?.charAt(0);
  };

  const handleImgError = () => {
    setImageError(true);
  };

  const initials = getInitials(firstName, lastName);

  return (
    <div
      className={[
        styles.initialsContainer,
        showEditModal && iconType === "modalIcon"
          ? styles.editProfileContainer
          : "",
        imageContainerStyle,
      ].join(" ")}
    >
      {imageError || !profileImage ? (
        <Avatar
          className={[
            styles.initialsAvatar,
            styles.profileAvatar,
            profileImageStyle,
          ].join(" ")}
        >
          {initials}
        </Avatar>
      ) : (
        <Avatar
          src={profileImage}
          className={[styles.profileAvatar, profileImageStyle].join(" ")}
          onError={handleImgError}
        />
      )}
      {!!icon && (
        <div className={styles.iconContainer}>
          <Image
            preview={false}
            src={icon}
            className={styles.editIcon}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

ProfileIcon.propTypes = {
  firstName: PropTypes.string,
  icon: PropTypes.string,
  iconType: PropTypes.string,
  imageContainerStyle: PropTypes.string,
  lastName: PropTypes.string,
  onClick: PropTypes.func,
  profileImage: PropTypes.string,
  profileImageStyle: PropTypes.string,
  showEditModal: PropTypes.bool,
};

export default ProfileIcon;