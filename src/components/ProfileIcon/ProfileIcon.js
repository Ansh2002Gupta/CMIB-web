import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";

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
  const { getImage } = useContext(ThemeContext);

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
          src={getImage("global")}
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
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return (
      <div
        className={[
          styles.initialsContainer,
          showEditModal && iconType === "modalIcon"
            ? styles.editProfileContainer
            : "",
          initialContainerStyle,
        ].join(" ")}
      >
        <Typography className={styles.initialsText}>{initials}</Typography>
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
