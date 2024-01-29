import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Image, Switch } from "antd";

import { ThreeRow, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "../../core/hooks/useResponsive";

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
  const chipsArray = [
    "CA Jobs",
    "Control",
    "Women Placements",
    "Newly qualified placements",
    "Newly qualified placements 1",
    "Newly qualified placements 2",
  ];

  const { getImage } = useContext(ThemeContext);

  const [is2FactorAuthenicationOn, setIs2FactorAuthenicationOn] =
    useState(false);
  const howManyChipsToShowAtMax = 2;

  const responsive = useResponsive();

  const openModuleAndControlModal = () => setCurrentOpenModal(2);

  return (
    <TwoRow
      className={styles.profileMainContainer}
      topSection={
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
              iconType="modalIcon"
              showEditModal
              icon={getImage("smallCircularEditBtn")}
            />
          }
        />
      }
      bottomSection={
        <ThreeRow
          className={styles.bottomBox}
          topSection={
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
          middleSection={
            <div className={styles.accessAndDateContainer}>
              <div className={styles.textAndValueContainer}>
                <Typography className={styles.greyText}>
                  {intl.formatMessage({ id: "label.access" })}:{" "}
                </Typography>
                <div className={styles.chipsContainer}>
                  {chipsArray?.map((item, index) => {
                    if (howManyChipsToShowAtMax < index) {
                      return <></>;
                    }
                    const arrayLength = chipsArray?.length;
                    return (
                      <Chip
                        bgColor={styles.chipsBg}
                        label={
                          howManyChipsToShowAtMax === index
                            ? `+${arrayLength - howManyChipsToShowAtMax}`
                            : item
                        }
                        textColor={styles.darkText}
                        customContainerStyles={
                          howManyChipsToShowAtMax === index
                            ? styles.cursorPointer
                            : ""
                        }
                        onClick={
                          howManyChipsToShowAtMax === index
                            ? openModuleAndControlModal
                            : () => {}
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div className={styles.textAndValueContainer}>
                <Typography className={styles.greyText}>
                  {intl.formatMessage({ id: "label.dateCreatedOn" })}:
                </Typography>
                <Typography className={styles.darkText}>
                  {createdDate}
                </Typography>
              </div>
            </div>
          }
          bottomSection={
            <div className={styles.textAndValueContainer}>
              <Switch
                className={is2FactorAuthenicationOn ? styles.switch : ""}
                checked={is2FactorAuthenicationOn}
                onChange={() => setIs2FactorAuthenicationOn((prev) => !prev)}
                size={!responsive.isSm ? "small" : "default"}
              />
              <Typography className={styles.darkText}>
                {intl.formatMessage({
                  id: "account.enableTwoFactorAuthentication",
                })}
              </Typography>
            </div>
          }
          middleSectionStyle={classes.thirdSectionStyle}
          bottomSectionStyle={classes.thirdSectionStyle}
        />
      }
    />
  );
};

ViewProfileModal.propTypes = {
  closeModal: PropTypes.func,
  setModalSelect: PropTypes.func,
};

export default ViewProfileModal;
