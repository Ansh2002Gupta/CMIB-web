import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Image, Button } from "antd";

import { ThemeContext } from "core/providers/theme";
import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import { classes } from "./ModalComponent.styles";
import styles from "./modalComponent.module.scss";
import Chip from "../Chip/Chip";

const AccessViewModal = ({ setCurrentOpenModal }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const access = ["control", "ca-jobs", "women placements"];
  const control = [
    "Bulk Notifications",
    "ca-jobs",
    "women placements",
    "Ticket Management",
    "Testimonial Management",
    "Testimonial Management",
  ];

  return (
    <div>
      <ThreeRow
        topSection={
          <TwoColumn
            className={[styles.padding24px, styles.topHeadingStyles].join(" ")}
            isLeftFillSpace
            isRightFillSpace
            leftSection={
              <Typography className={styles.headingText}>
                {intl.formatMessage({ id: "label.access" })}
              </Typography>
            }
            rightSectionStyle={classes.rightSectionStyles}
            leftSectionStyle={classes.leftSectionStyles}
            rightSection={
              <Image
                src={getImage("cross")}
                preview={false}
                className={[styles.crossIconStyle]}
                onClick={() => setCurrentOpenModal(1)}
              />
            }
          />
        }
        middleSection={
          <TwoRow
            className={styles.padding24px}
            topSection={
              <Typography className={styles.greyText}>
                {intl.formatMessage({ id: "label.moduleAccess" })} :
              </Typography>
            }
            bottomSection={
              <div className={styles.chipsBox}>
                {access?.map((item) => {
                  return (
                    <Chip
                      bgColor={styles.chipsBg}
                      textColor={styles.darkText}
                      label={item}
                    />
                  );
                })}
              </div>
            }
          />
        }
        bottomSection={
          <TwoRow
            className={styles.padding24px}
            topSection={
              <Typography className={styles.greyText}>
                {intl.formatMessage({ id: "label.controlAccessHeading" })} :
              </Typography>
            }
            bottomSection={
              <div className={styles.chipsBox}>
                {control?.map((item) => {
                  return (
                    <Chip
                      bgColor={styles.chipsBg}
                      textColor={styles.darkText}
                      label={item}
                    />
                  );
                })}
              </div>
            }
          />
        }
      />
    </div>
  );
};

AccessViewModal.propTypes = {
  closeModal: PropTypes.func,
  handleLogout: PropTypes.func,
};

export default AccessViewModal;
