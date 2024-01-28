import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Image, Switch } from "antd";

import { FourRow, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import Chip from "../Chip/Chip";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { classes } from "./ModalComponent.styles";
import styles from "./modalComponent.module.scss";

const ViewProfileModal = ({ setModalSelect, setCurrentOpenModal }) => {
  const intl = useIntl();
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const profileImage = "https://picsum.photos/id/10/200/300";
  const email = "kashish.natheja@gmail.com";
  const phone = "+91-1234567890";
  const createdDate = "10/10/2023";
  const designation = "Senior Chartered Accountant";

  const { getImage } = useContext(ThemeContext);

  const openModuleAndControlModal = () => setCurrentOpenModal(2);

  return (
    <FourRow
      className={styles.profileMainContainer}
      firstSection={
        <TwoRow
          className={styles.secondSectionStyle}
          topSectionStyle={classes.crossStyle}
          topSection={
            <Image
              preview={false}
              src={getImage("cross")}
              className={styles.crossIconStyle}
              onClick={() => setCurrentOpenModal(0)}
            />
          }
          bottomSection={
            <ProfileIcon
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
              imageContainerStyle={styles.imageContainerStyle}
              initialContainerStyle={styles.initialContainerStyle}
              onClick={() => {
                setCurrentOpenModal(3);
              }}
              icon={getImage("edit")}
            />
          }
        />
      }
      secondSection={
        <div className={[styles.secondSectionStyle].join(" ")}>
          <Typography className={styles.headingText}>
            {`${firstName} ${lastName}`}
          </Typography>
          <div className={styles.emailAndMobileNoContainer}>
            <Typography
              className={[
                styles.subHeadingText,
                styles.rightAlign,
                styles.greyText,
              ].join(" ")}
              title={phone}
            >
              {phone}
            </Typography>
            <div className={styles.divider}></div>
            <Typography
              className={[
                styles.subHeadingText,
                styles.leftAlign,
                styles.greyText,
              ].join(" ")}
            >
              {email}
            </Typography>
          </div>
        </div>
      }
      thirdSection={
        <div className={styles.accessAndDateContainer}>
          <div className={styles.textAndValueContainer}>
            <Typography className={styles.greyText}>
              {intl.formatMessage({ id: "label.access" })}:{" "}
            </Typography>
            <div className={styles.chipsContainer}>
              <Chip
                bgColor={styles.chipsBg}
                label={"Control"}
                textColor={styles.darkText}
              />
              <Chip
                bgColor={styles.chipsBg}
                label={"CA jobs"}
                textColor={styles.darkText}
              />
              <Chip
                bgColor={styles.chipsBg}
                label={"+4"}
                textColor={styles.darkText}
                customContainerStyles={styles.cursorPointer}
                onClick={openModuleAndControlModal}
              />
            </div>
          </div>
          <div className={styles.textAndValueContainer}>
            <Typography className={styles.greyText}>
              {intl.formatMessage({ id: "label.dateCreatedOn" })}:
            </Typography>
            <Typography className={styles.darkText}>{createdDate}</Typography>
          </div>
        </div>
      }
      thirdSectionStyle={classes.thirdSectionStyle}
      lastSectionStyle={classes.thirdSectionStyle}
      lastSection={
        <div className={styles.textAndValueContainer}>
          <Switch className={styles.switch} />
          <Typography className={styles.darkText}>
            {intl.formatMessage({
              id: "account.enableTwoFactorAuthentication",
            })}
          </Typography>
        </div>
      }
    />
  );
};

ViewProfileModal.propTypes = {
  closeModal: PropTypes.func,
  setModalSelect: PropTypes.func,
};

export default ViewProfileModal;
