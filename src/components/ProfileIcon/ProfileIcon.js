import React from "react";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import styles from "./ProfileIcon.module.scss";

const ProfileIcon = ({
  firstName,
  icon,
  iconType,
  imageContainerStyle,
  initialContainerStyle,
  lastName,
  onClick,
  profileImage,
  profileImageStyle,
  showEditModal,
}) => {
  const getInitials = (fName, lName) => {
    if (fName && lName) {
      return `${fName?.charAt(0)}${lName?.charAt(0)}`;
    }
    return fName?.charAt(0);
  };

  if (profileImage) {
    return (
      <div
        className={[
          styles.initialsContainer,
          showEditModal && iconType === "modalIcon"
            ? styles.editProfileContainer
            : "",
          imageContainerStyle,
        ].join(" ")}
        onClick={onClick}
      >
        <Image
          src={profileImage}
          preview={false}
          className={[
            showEditModal && iconType === "modalIcon"
              ? styles.modalProfileImage
              : styles.profileImageStyle,
            profileImageStyle,
          ].join(" ")}
        />
        {icon && (
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
  } else {
    const initials = getInitials(firstName, lastName);
    return (
      <div
        className={[
          styles.initialsContainer,
          showEditModal && iconType === "modalIcon"
            ? styles.editProfileContainer
            : "",
          initialContainerStyle,
        ].join(" ")}
        onClick={onClick}
      >
        <Typography
          className={[styles.initialsText, styles.initials].join(" ")}
        >
          {initials}
        </Typography>
      </div>
    );
  }
};

ProfileIcon.propTypes = {
  firstName: PropTypes.string,
  icon: PropTypes.element,
  iconType: PropTypes.string,
  imageContainerStyle: PropTypes.object,
  initialContainerStyle: PropTypes.object,
  lastName: PropTypes.string,
  onClick: PropTypes.func,
  profileImage: PropTypes.string,
  profileImageStyle: PropTypes.object,
  showEditModal: PropTypes.bool,
};

export default ProfileIcon;
