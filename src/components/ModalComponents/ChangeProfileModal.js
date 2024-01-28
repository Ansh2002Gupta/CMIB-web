import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Image, Button } from "antd";

import { ThreeRow, TwoColumn } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { classes } from "./ModalComponent.styles";
import styles from "./modalComponent.module.scss";

const ChangeProfileModal = ({ setCurrentOpenModal }) => {
  const intl = useIntl();
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const profileImage = "https://picsum.photos/id/10/200/300";

  const { getImage } = useContext(ThemeContext);

  return (
    <ThreeRow
      className={styles.changeProfileContainer}
      topSection={
        <TwoColumn
          className={styles.headingStyle}
          leftSection={
            <Typography className={styles.headingText}>
              {intl.formatMessage({ id: "label.editProfilePicture" })}
            </Typography>
          }
          rightSection={
            <Image
              preview={false}
              src={getImage("cross")}
              className={styles.crossIconStyle}
              onClick={()=>setCurrentOpenModal(1)}
            />
          }
        />
      }
      middleSectionStyle={classes.middleSectionStyles}
      middleSection={
        <div className={styles.imageBox}>
          <ProfileIcon
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            profileImageStyle={styles.profileImageStyle}
            imageContainerStyle={styles.imageContainerStyle}
          />
        </div>
      }
      bottomSection={
        <TwoColumn
          className={styles.bottomSectionStyle}
          isLeftFillSpace
          isRightFillSpace
          leftSection={
            <Button
              className={[styles.cancelButton, styles.buttonText].join(" ")}
              icon={<Image src={getImage("editIcon")} preview={false} />}
            >
              {intl.formatMessage({ id: "label.change" })}
            </Button>
          }
          rightSection={
            <Button
              className={[styles.buttonText, styles.cancelButton].join(" ")}
              icon={<Image src={getImage("trashBlue")} preview={false} />}
            >
              {intl.formatMessage({ id: "label.remove" })}
            </Button>
          }
        />
      }
    />
  );
};

ChangeProfileModal.propTypes = {
  setCurrentOpenModal: PropTypes.func,
};

export default ChangeProfileModal;
